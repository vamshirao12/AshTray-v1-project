import { useEffect, useMemo, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import Header from "../components/layout/Header";
import api from "../services/api";

import {
  Wallet,
  Cigarette,
  TrendingDown,
  Target,
  BarChart3,
} from "lucide-react";

// ============================================================
// HELPERS
// ============================================================

const formatMoney = (value) => {
  const amount = Number(value) || 0;

  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

const formatNumber = (value) => {
  const number = Number(value) || 0;

  return number.toLocaleString("en-IN", {
    maximumFractionDigits: 1,
  });
};

const getEntryDate = (entry) => {
  return new Date(entry.date || entry.createdAt);
};

const getEntryQuantity = (entry) => {
  return Number(entry.quantity) || 1;
};

const getEntryPrice = (entry) => {
  return Number(entry.price) || 0;
};

// One cigarette price × quantity logged
const getEntrySpending = (entry) => {
  return (
    getEntryPrice(entry) *
    getEntryQuantity(entry)
  );
};

const isSameDay = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// ============================================================
// STAT CARD
// ============================================================

const StatCard = ({
  icon,
  label,
  value,
  description,
}) => {
  return (
    <div
      className="
        rounded-[24px]
        border
        border-[#C65D2E]/10
        bg-[#F1DFD0]
        p-6
      "
    >
      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-[#C65D2E]/10
            text-[#C65D2E]
          "
        >
          {icon}
        </div>

        <p className="text-sm font-semibold text-[#7A685D]">
          {label}
        </p>

      </div>

      <p className="mt-5 break-words text-3xl font-black text-[#33251F]">
        {value}
      </p>

      <p className="mt-1 text-sm text-[#8B7568]">
        {description}
      </p>
    </div>
  );
};

// ============================================================
// MONEY SPENT
// ============================================================

const MoneySpentCard = ({
  amount,
  period,
}) => {
  return (
    <div
      className="
        rounded-[28px]
        border
        border-[#C65D2E]/15
        bg-[#332923]
        p-6
        md:p-8
      "
    >
      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-[#C65D2E]/10
            text-[#C65D2E]
          "
        >
          <Wallet size={24} />
        </div>

        <div>

          <p className="text-sm font-semibold text-[#BCA99D]">
            Money Spent
          </p>

          <p className="mt-1 text-4xl font-black text-[#FFF8F1] md:text-5xl">
            {formatMoney(amount)}
          </p>

        </div>

      </div>

      <p className="mt-4 text-sm text-[#C9B8AC]">
        Total money spent{" "}
        {period === "weekly"
          ? "this week"
          : period === "monthly"
          ? "this month"
          : "this year"}
      </p>

    </div>
  );
};

// ============================================================
// ACTIVITY CHART
// ============================================================

const ActivityChart = ({
  entries,
  period,
}) => {
  const chartData = useMemo(() => {
    const now = new Date();

    if (period === "weekly") {
      const days = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);

        date.setHours(0, 0, 0, 0);
        date.setDate(now.getDate() - i);

        const count = entries.reduce(
          (total, entry) => {
            const entryDate = getEntryDate(entry);

            if (isSameDay(entryDate, date)) {
              return (
                total +
                getEntryQuantity(entry)
              );
            }

            return total;
          },
          0
        );

        days.push({
          label: date.toLocaleDateString(
            "en-IN",
            {
              weekday: "short",
            }
          ),
          count,
        });
      }

      return days;
    }

    if (period === "monthly") {
      const year = now.getFullYear();
      const month = now.getMonth();

      const daysInMonth = new Date(
        year,
        month + 1,
        0
      ).getDate();

      const weeks = [
        {
          label: "Week 1",
          start: 1,
          end: 7,
        },
        {
          label: "Week 2",
          start: 8,
          end: 14,
        },
        {
          label: "Week 3",
          start: 15,
          end: 21,
        },
        {
          label: "Week 4",
          start: 22,
          end: 28,
        },
        {
          label: "Week 5",
          start: 29,
          end: daysInMonth,
        },
      ];

      return weeks.map((week) => {
        const count = entries.reduce(
          (total, entry) => {
            const date = getEntryDate(entry);

            if (
              date.getFullYear() === year &&
              date.getMonth() === month &&
              date.getDate() >= week.start &&
              date.getDate() <= week.end
            ) {
              return (
                total +
                getEntryQuantity(entry)
              );
            }

            return total;
          },
          0
        );

        return {
          label: week.label,
          count,
        };
      });
    }

    if (period === "yearly") {
      const year = now.getFullYear();

      return Array.from(
        { length: 12 },
        (_, index) => {
          const count = entries.reduce(
            (total, entry) => {
              const date = getEntryDate(entry);

              if (
                date.getFullYear() === year &&
                date.getMonth() === index
              ) {
                return (
                  total +
                  getEntryQuantity(entry)
                );
              }

              return total;
            },
            0
          );

          return {
            label: new Date(
              year,
              index,
              1
            ).toLocaleDateString(
              "en-IN",
              {
                month: "short",
              }
            ),
            count,
          };
        }
      );
    }

    return [];
  }, [entries, period]);

  const maxValue = Math.max(
    ...chartData.map(
      (item) => item.count
    ),
    1
  );

  return (
    <div className="rounded-[28px] bg-[#332923] p-6 md:p-8">

      <div className="mb-8">

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C65D2E]">
          {period === "weekly"
            ? "Weekly Trend"
            : period === "monthly"
            ? "Monthly Trend"
            : "Yearly Trend"}
        </p>

        <h2 className="mt-2 text-2xl font-black text-[#FFF8F1]">
          {period === "weekly"
            ? "Your Last 7 Days"
            : period === "monthly"
            ? "Your Monthly Activity"
            : "Your Yearly Activity"}
        </h2>

        <p className="mt-2 text-sm text-[#C9B8AC]">
          {period === "weekly"
            ? "Your smoking activity across the last seven days."
            : period === "monthly"
            ? "Your smoking activity across each week of this month."
            : "Your smoking activity across each month of this year."}
        </p>

      </div>

      <div className="flex h-72 items-end gap-2 overflow-x-auto md:gap-4">

        {chartData.map(
          (item, index) => {
            const height =
              item.count === 0
                ? 3
                : Math.max(
                    (item.count /
                      maxValue) *
                      100,
                    8
                  );

            return (
              <div
                key={`${item.label}-${index}`}
                className="
                  flex
                  h-full
                  min-w-[38px]
                  flex-1
                  flex-col
                  items-center
                  justify-end
                "
              >

                <p className="mb-2 text-xs font-bold text-[#D8C8BD]">
                  {item.count}
                </p>

                <div
                  className="
                    flex
                    w-full
                    max-w-[55px]
                    items-end
                    rounded-t-xl
                    bg-[#46382F]
                  "
                  style={{
                    height: `${height}%`,
                  }}
                >

                  {item.count > 0 && (
                    <div
                      className="
                        w-full
                        rounded-t-xl
                        bg-[#C65D2E]
                        transition-all
                        duration-500
                      "
                      style={{
                        height: "100%",
                      }}
                    />
                  )}

                </div>

                <p className="mt-3 whitespace-nowrap text-xs font-semibold text-[#BCA99D]">
                  {item.label}
                </p>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
};

// ============================================================
// WEEKLY SUMMARY
// ============================================================

const WeeklySummary = ({
  entries,
}) => {
  const summary = useMemo(() => {
    const today = new Date();

    const start = new Date(today);

    start.setHours(0, 0, 0, 0);

    start.setDate(
      today.getDate() - 6
    );

    const weeklyEntries =
      entries.filter((entry) => {
        const date =
          getEntryDate(entry);

        return (
          date >= start &&
          date <= today
        );
      });

    const cigarettes =
      weeklyEntries.reduce(
        (total, entry) =>
          total +
          getEntryQuantity(entry),
        0
      );

    return {
      cigarettes,
      average: cigarettes / 7,
    };
  }, [entries]);

  return (
    <div
      className="
        mt-8
        rounded-[24px]
        border
        border-[#C65D2E]/10
        bg-[#F1DFD0]
        p-6
      "
    >

      <p className="text-sm font-bold text-[#C65D2E]">
        Weekly Summary
      </p>

      <div className="mt-3 space-y-1 text-sm text-[#33251F]">

        <p>
          Total this week:{" "}
          <span className="font-bold text-[#33251F]">
            {summary.cigarettes} cigarettes
          </span>
        </p>

        <p>
          Daily average:{" "}
          <span className="font-bold text-[#33251F]">
            {formatNumber(
              summary.average
            )} cigarettes
          </span>
        </p>

      </div>

    </div>
  );
};

// ============================================================
// MAIN
// ============================================================

export default function Analytics() {
  const [entries, setEntries] = useState([]);
  const [period, setPeriod] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEntries = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await api.get("/entries");

      setEntries(
        response.data.entries || []
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Unable to load analytics."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const periodEntries = useMemo(() => {
    const now = new Date();

    if (period === "weekly") {
      const start = new Date(now);

      start.setHours(0, 0, 0, 0);

      start.setDate(
        now.getDate() - 6
      );

      return entries.filter(
        (entry) => {
          const date =
            getEntryDate(entry);

          return date >= start;
        }
      );
    }

    if (period === "monthly") {
      return entries.filter(
        (entry) => {
          const date =
            getEntryDate(entry);

          return (
            date.getFullYear() ===
              now.getFullYear() &&
            date.getMonth() ===
              now.getMonth()
          );
        }
      );
    }

    return entries.filter(
      (entry) => {
        const date =
          getEntryDate(entry);

        return (
          date.getFullYear() ===
          now.getFullYear()
        );
      }
    );
  }, [entries, period]);

  const statistics = useMemo(() => {
    const cigarettes =
      periodEntries.reduce(
        (total, entry) =>
          total +
          getEntryQuantity(entry),
        0
      );

    const spending =
      periodEntries.reduce(
        (total, entry) =>
          total +
          getEntrySpending(entry),
        0
      );

    const now = new Date();

    let daysPassed = 1;

    if (period === "weekly") {
      daysPassed = 7;
    } else if (period === "monthly") {
      daysPassed = now.getDate();
    } else {
      const startOfYear =
        new Date(
          now.getFullYear(),
          0,
          1
        );

      const difference =
        now.getTime() -
        startOfYear.getTime();

      daysPassed =
        Math.floor(
          difference /
            (1000 * 60 * 60 * 24)
        ) + 1;
    }

    daysPassed = Math.max(
      daysPassed,
      1
    );

    const averageCigarettes =
      cigarettes / daysPassed;

    const averageSpending =
      spending / daysPassed;

    const triggerCounts = {};

    periodEntries.forEach(
      (entry) => {
        const trigger =
          entry.trigger ||
          entry.reason ||
          entry.craving ||
          entry.mood ||
          entry.context;

        if (!trigger) return;

        const cleaned =
          String(trigger).trim();

        if (!cleaned) return;

        triggerCounts[cleaned] =
          (triggerCounts[cleaned] || 0) +
          1;
      }
    );

    let topTrigger = null;

    Object.entries(
      triggerCounts
    ).forEach(
      ([trigger, count]) => {
        if (
          !topTrigger ||
          count >
            topTrigger.count
        ) {
          topTrigger = {
            trigger,
            count,
          };
        }
      }
    );

    return {
      cigarettes,
      spending,
      averageCigarettes,
      averageSpending,
      topTrigger,
    };
  }, [
    periodEntries,
    period,
  ]);

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-[#F6EDE3] px-6 py-10">

          <div className="mx-auto max-w-6xl animate-pulse">

            <div className="h-4 w-32 rounded bg-[#E7D5C5]" />

            <div className="mt-4 h-12 w-80 rounded bg-[#E7D5C5]" />

            <div className="mt-10 h-32 rounded-[24px] bg-[#E7D5C5]" />

            <div className="mt-4 grid gap-4 md:grid-cols-2">

              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="h-40 rounded-[24px] bg-[#E7D5C5]"
                  />
                )
              )}

            </div>

          </div>

        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>

        <div className="min-h-screen bg-[#F6EDE3] px-6 py-10">

          <div className="mx-auto max-w-6xl">

            <div className="rounded-[24px] border border-[#C65D2E]/20 bg-[#F1DFD0] p-8">

              <h2 className="text-2xl font-black text-[#33251F]">
                Unable to load analytics
              </h2>

              <p className="mt-2 text-[#7A685D]">
                {error}
              </p>

              <button
                onClick={fetchEntries}
                className="mt-6 rounded-xl bg-[#C65D2E] px-5 py-3 font-semibold text-white transition hover:bg-[#B95025]"
              >
                Try Again
              </button>

            </div>

          </div>

        </div>

      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <div className="min-h-screen bg-[#F6EDE3] text-[#33251F]">

        <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-10">

          <Header />

          <div className="mt-8">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C65D2E]">
              Insights
            </p>

            <h1 className="mt-2 text-4xl font-black tracking-tight text-[#33251F] md:text-5xl">
              Your Analytics
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-[#7A685D]">
              Understand your smoking patterns,
              spending, and the situations that
              trigger your habits.
            </p>

          </div>

          {/* PERIOD */}

          <div className="mt-8 inline-flex rounded-2xl border border-[#C65D2E]/15 bg-[#EBDCCD] p-1">

            {["weekly", "monthly", "yearly"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setPeriod(item)
                  }
                  className={`
                    rounded-xl
                    px-5
                    py-3
                    text-sm
                    font-bold
                    capitalize
                    transition
                    ${
                      period === item
                        ? "bg-[#C65D2E] text-white shadow-sm"
                        : "text-[#7A685D] hover:text-[#33251F]"
                    }
                  `}
                >
                  {item}
                </button>
              )
            )}

          </div>

          {/* STATISTICS */}

          <section className="mt-8 space-y-4">

            <MoneySpentCard
              amount={statistics.spending}
              period={period}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <StatCard
                icon={
                  <Cigarette size={20} />
                }
                label="Cigarettes"
                value={statistics.cigarettes}
                description={
                  period === "weekly"
                    ? "Total this week"
                    : period === "monthly"
                    ? "Total this month"
                    : "Total this year"
                }
              />

              {/* FIXED ICON */}

              <StatCard
                icon={
                  <Cigarette size={20} />
                }
                label="Average Cigarettes"
                value={formatNumber(
                  statistics.averageCigarettes
                )}
                description="Per day"
              />

              <StatCard
                icon={
                  <Wallet size={20} />
                }
                label="Average Spending"
                value={formatMoney(
                  statistics.averageSpending
                )}
                description="Per day"
              />

              {/* FIXED ICON */}

              <StatCard
                icon={
                  <Target size={20} />
                }
                label="Top Trigger"
                value={
                  statistics.topTrigger
                    ? statistics.topTrigger.trigger
                    : "No data yet"
                }
                description={
                  statistics.topTrigger
                    ? `${
                        statistics.topTrigger.count
                      } ${
                        statistics.topTrigger.count === 1
                          ? "entry"
                          : "entries"
                      }`
                    : "No trigger recorded"
                }
              />

            </div>

          </section>

          {/* CHART */}

          <section className="mt-8">

            <ActivityChart
              entries={entries}
              period={period}
            />

          </section>

          {/* WEEKLY SUMMARY */}

          {period === "weekly" && (
            <WeeklySummary
              entries={entries}
            />
          )}

          {/* OVERVIEW */}

          <section className="mt-8 rounded-[28px] border border-[#C65D2E]/15 bg-[#332923] p-6 md:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C65D2E]/10 text-[#C65D2E]">

                <BarChart3 size={22} />

              </div>

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
                  {period === "weekly"
                    ? "Weekly Overview"
                    : period === "monthly"
                    ? "Monthly Overview"
                    : "Yearly Overview"}
                </p>

                <h2 className="mt-1 text-xl font-black text-[#FFF8F1]">
                  Your activity at a glance
                </h2>

              </div>

            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl bg-[#3B302A] p-5">

                <p className="text-xs text-[#BCA99D]">
                  Cigarettes
                </p>

                <p className="mt-2 text-2xl font-black text-[#FFF8F1]">
                  {statistics.cigarettes}
                </p>

              </div>

              <div className="rounded-2xl bg-[#3B302A] p-5">

                <p className="text-xs text-[#BCA99D]">
                  Average / Day
                </p>

                <p className="mt-2 text-2xl font-black text-[#FFF8F1]">
                  {formatNumber(
                    statistics.averageCigarettes
                  )}
                </p>

              </div>

              <div className="rounded-2xl bg-[#3B302A] p-5">

                <p className="text-xs text-[#BCA99D]">
                  Spending
                </p>

                <p className="mt-2 text-2xl font-black text-[#FFF8F1]">
                  {formatMoney(
                    statistics.spending
                  )}
                </p>

              </div>

            </div>

          </section>

          <div className="h-12" />

        </div>

      </div>

    </AppLayout>
  );
}