import { useEffect, useMemo, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import Header from "../components/layout/Header";
import GlassCard from "../components/ui/GlassCard";

import api from "../services/api";

import {
  Target,
  TrendingDown,
  ClipboardCheck,
  Wallet,
  CheckCircle2,
} from "lucide-react";

const getDayKey = (date) => {
  const d = new Date(date);

  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
};

const Challenges = () => {
  const [entries, setEntries] = useState([]);
  const [dailyLimit, setDailyLimit] = useState(10);
  const [loading, setLoading] = useState(true);

  // ---------------------------------------
  // FETCH DATA
  // ---------------------------------------

  const fetchData = async () => {
    try {
      const [entriesResponse, profileResponse] = await Promise.all([
        api.get("/entries"),
        api.get("/auth/me"),
      ]);

      setEntries(entriesResponse.data.entries || []);

      setDailyLimit(
        Number(profileResponse.data.user?.dailyGoal) || 10
      );
    } catch (error) {
      console.error("Failed to load challenges:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------------------------------
  // DAILY STATISTICS
  // ---------------------------------------

  const stats = useMemo(() => {
    const todayKey = getDayKey(new Date());

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayKey = getDayKey(yesterday);

    const todayEntries = entries.filter(
      (entry) =>
        entry.date &&
        getDayKey(entry.date) === todayKey
    );

    const yesterdayEntries = entries.filter(
      (entry) =>
        entry.date &&
        getDayKey(entry.date) === yesterdayKey
    );

    const todayCigarettes = todayEntries.reduce(
      (total, entry) =>
        total + Number(entry.quantity || 1),
      0
    );

    const yesterdayCigarettes = yesterdayEntries.reduce(
      (total, entry) =>
        total + Number(entry.quantity || 1),
      0
    );

    const todaySpending = todayEntries.reduce(
      (total, entry) =>
        total +
        Number(entry.price || 0) *
          Number(entry.quantity || 1),
      0
    );

    const yesterdaySpending = yesterdayEntries.reduce(
      (total, entry) =>
        total +
        Number(entry.price || 0) *
          Number(entry.quantity || 1),
      0
    );

    return {
      todayEntries,
      yesterdayEntries,
      todayCigarettes,
      yesterdayCigarettes,
      todaySpending,
      yesterdaySpending,
    };
  }, [entries]);

  // ---------------------------------------
  // CHALLENGES
  // ---------------------------------------

  const challenges = useMemo(() => {
    const {
      todayEntries,
      yesterdayCigarettes,
      todayCigarettes,
      todaySpending,
      yesterdaySpending,
    } = stats;

    // -----------------------------
    // 1. DAILY LIMIT
    // -----------------------------

    const hasLoggedToday =
      todayEntries.length > 0;

    const withinLimit =
      hasLoggedToday &&
      todayCigarettes <= dailyLimit;

    let limitProgress = 0;

    if (hasLoggedToday) {
      if (todayCigarettes <= dailyLimit) {
        limitProgress = 100;
      } else {
        limitProgress = Math.max(
          0,
          Math.round(
            (dailyLimit / todayCigarettes) * 100
          )
        );
      }
    }

    // -----------------------------
    // 2. REDUCE BY TWO
    // -----------------------------

    const reduction =
      Math.max(
        yesterdayCigarettes - todayCigarettes,
        0
      );

    const hasYesterdayData =
      yesterdayCigarettes > 0;

    const reducedByTwo =
      hasYesterdayData &&
      reduction >= 2;

    const reductionProgress =
      !hasYesterdayData
        ? 0
        : Math.min(
            Math.round(
              (reduction / 2) * 100
            ),
            100
          );

    // -----------------------------
    // 3. LOG CONSISTENTLY
    // -----------------------------

    const loggingTarget = 3;

    const loggingProgress = Math.min(
      todayEntries.length,
      loggingTarget
    );

    const loggingComplete =
      loggingProgress >= loggingTarget;

    const loggingPercentage = Math.round(
      (loggingProgress / loggingTarget) * 100
    );

    // -----------------------------
    // 4. SPEND LESS
    // -----------------------------

    const hasPreviousSpending =
      yesterdaySpending > 0;

    const spendingComplete =
      hasPreviousSpending &&
      todaySpending < yesterdaySpending;

    let spendingProgress = 0;

    if (hasPreviousSpending) {
      if (spendingComplete) {
        spendingProgress = 100;
      } else {
        spendingProgress = Math.max(
          0,
          Math.round(
            (yesterdaySpending /
              Math.max(todaySpending, 1)) *
              50
          )
        );

        spendingProgress = Math.min(
          spendingProgress,
          99
        );
      }
    }

    return [
      {
        title: "Stay Within Your Daily Limit",

        description:
          "Keep today's cigarette count within the personal limit you've set for yourself.",

        progress: limitProgress,

        status:
          !hasLoggedToday
            ? `Log your first activity today`
            : withinLimit
            ? `${todayCigarettes} of ${dailyLimit} cigarettes`
            : `${todayCigarettes - dailyLimit} over your limit`,

        icon: Target,

        completed: withinLimit,
      },

      {
        title: "Reduce By Two",

        description:
          "Try to have at least two fewer cigarettes today than you had yesterday.",

        progress: reductionProgress,

        status:
          !hasYesterdayData
            ? "Requires activity from yesterday"
            : reducedByTwo
            ? `${reduction} cigarettes reduced`
            : `${reduction} of 2 cigarettes reduced`,

        icon: TrendingDown,

        completed: reducedByTwo,
      },

      {
        title: "Keep Track Today",

        description:
          "Log your smoking activity consistently so you can understand your patterns and triggers.",

        progress: loggingPercentage,

        status:
          loggingComplete
            ? "3 activities logged"
            : `${loggingProgress} of ${loggingTarget} activities logged`,

        icon: ClipboardCheck,

        completed: loggingComplete,
      },

      {
        title: "Spend Less Than Yesterday",

        description:
          "Try to spend less on cigarettes today than you did yesterday.",

        progress: spendingProgress,

        status:
          !hasPreviousSpending
            ? "Requires spending from yesterday"
            : spendingComplete
            ? `₹${todaySpending.toFixed(
                0
              )} spent today`
            : `₹${todaySpending.toFixed(
                0
              )} spent so far`,

        icon: Wallet,

        completed: spendingComplete,
      },
    ];
  }, [stats, dailyLimit]);

  // ---------------------------------------
  // COMPLETED / ACTIVE
  // ---------------------------------------

  const completedChallenges =
    challenges.filter(
      (challenge) => challenge.completed
    );

  const activeChallenges =
    challenges.filter(
      (challenge) => !challenge.completed
    );

  const overallProgress =
    challenges.length === 0
      ? 0
      : Math.round(
          (completedChallenges.length /
            challenges.length) *
            100
        );

  // ---------------------------------------
  // LOADING
  // ---------------------------------------

  if (loading) {
    return (
      <AppLayout>
        <Header />

        <div className="flex min-h-[50vh] items-center justify-center">
          <p className="text-[#7A685D]">
            Loading your challenges...
          </p>
        </div>
      </AppLayout>
    );
  }

  // ---------------------------------------
  // PAGE
  // ---------------------------------------

  return (
    <AppLayout>
      <Header />

      <div className="space-y-8">

        {/* -------------------------------- */}
        {/* PAGE HEADER */}
        {/* -------------------------------- */}

        <GlassCard>

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#C65D2E]/10">

              <Target
                size={32}
                className="text-[#C65D2E]"
              />

            </div>

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C65D2E]">
                Daily Challenges
              </p>

              <h1 className="mt-2 text-4xl font-black text-[#33251F]">
                Small steps matter.
              </h1>

              <p className="mt-2 max-w-2xl text-[#7A685D]">
                Focus on realistic changes that help you
                understand, reduce, and eventually move
                beyond your smoking habits.
              </p>

            </div>

          </div>

        </GlassCard>

        {/* -------------------------------- */}
        {/* ACTIVE CHALLENGES */}
        {/* -------------------------------- */}

        {activeChallenges.length > 0 && (
          <section>

            <div className="mb-4">

              <h2 className="text-2xl font-black text-[#33251F]">
                Active Challenges
              </h2>

              <p className="mt-1 text-sm text-[#8A7568]">
                Small goals based on your activity today.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {activeChallenges.map(
                (challenge) => {

                  const Icon = challenge.icon;

                  return (
                    <div
                      key={challenge.title}
                      className="
                        rounded-3xl
                        border
                        border-[#C65D2E]/10
                        bg-[#F1DFD0]
                        p-6
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-[#C65D2E]/20
                      "
                    >

                      {/* TITLE */}

                      <div className="flex items-start gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C65D2E]/10">

                          <Icon
                            size={24}
                            className="text-[#C65D2E]"
                          />

                        </div>

                        <div>

                          <h3 className="text-lg font-bold text-[#33251F]">
                            {challenge.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-[#7A685D]">
                            {challenge.description}
                          </p>

                        </div>

                      </div>

                      {/* PROGRESS */}

                      <div className="mt-6">

                        <div className="mb-2 flex items-center justify-between">

                          <span className="text-xs font-semibold uppercase tracking-wider text-[#9A887A]">
                            Progress
                          </span>

                          <span className="text-sm font-bold text-[#C65D2E]">
                            {challenge.progress}%
                          </span>

                        </div>

                        <div className="h-2.5 overflow-hidden rounded-full bg-[#E3D0BE]">

                          <div
                            className="h-full rounded-full bg-[#C65D2E] transition-all duration-500"
                            style={{
                              width: `${challenge.progress}%`,
                            }}
                          />

                        </div>

                        <p className="mt-3 text-sm text-[#806A5C]">
                          {challenge.status}
                        </p>

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </section>
        )}

        {/* -------------------------------- */}
        {/* COMPLETED */}
        {/* -------------------------------- */}

        {completedChallenges.length > 0 && (
          <section>

            <div className="mb-4">

              <h2 className="text-2xl font-black text-[#33251F]">
                Completed Today
              </h2>

              <p className="mt-1 text-sm text-[#8A7568]">
                These goals have already been reached.
              </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

              {completedChallenges.map(
                (challenge) => {

                  const Icon = challenge.icon;

                  return (
                    <div
                      key={challenge.title}
                      className="
                        rounded-3xl
                        border
                        border-[#C65D2E]/15
                        bg-[#F6EBDD]
                        p-6
                      "
                    >

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C65D2E]/10">

                          <CheckCircle2
                            size={25}
                            className="text-[#C65D2E]"
                          />

                        </div>

                        <div className="flex-1">

                          <h3 className="font-bold text-[#33251F]">
                            {challenge.title}
                          </h3>

                          <p className="mt-1 text-sm text-[#806A5C]">
                            {challenge.status}
                          </p>

                        </div>

                        <Icon
                          size={20}
                          className="text-[#C65D2E]"
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </section>
        )}

        {/* -------------------------------- */}
        {/* DAILY SUMMARY */}
        {/* -------------------------------- */}

        <GlassCard>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C65D2E]">
                Today's Progress
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#33251F]">
                {completedChallenges.length} of{" "}
                {challenges.length} challenges completed
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#806A5C]">
                The goal isn't perfection. It's becoming
                more aware of your habits and making better
                decisions over time.
              </p>

            </div>

            {/* OVERALL PROGRESS */}

            <div className="w-full md:min-w-[220px] md:max-w-[240px]">

              <div className="mb-2 flex justify-between text-sm">

                <span className="text-[#806A5C]">
                  Overall
                </span>

                <span className="font-bold text-[#C65D2E]">
                  {overallProgress}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-[#E3D0BE]">

                <div
                  className="h-full rounded-full bg-[#C65D2E] transition-all duration-500"
                  style={{
                    width: `${overallProgress}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </GlassCard>

      </div>
    </AppLayout>
  );
};

export default Challenges;