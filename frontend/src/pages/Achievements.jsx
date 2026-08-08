import { useEffect, useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import Header from "../components/layout/Header";
import api from "../services/api";

import {
  TrendingDown,
  Cigarette,
  Wallet,
  CalendarCheck,
  Target,
  Check,
} from "lucide-react";


// ============================================================
// HELPERS
// ============================================================

const getDate = (entry) => {
  return new Date(entry.date || entry.createdAt);
};

const getQuantity = (entry) => {
  return Number(entry.quantity) || 1;
};

const money = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
};


// ============================================================
// SMALL STAT CARD
// ============================================================

function WinCard({
  icon,
  title,
  value,
  description,
}) {
  return (
    <div
      className="
        rounded-[24px]
        border border-[#C65D2E]/15
        bg-[#F8EEE4]
        p-6
      "
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-[#C65D2E]/10
          text-[#C65D2E]
        "
      >
        {icon}
      </div>

      <p
        className="
          mt-5
          text-3xl
          font-black
          text-[#33251F]
        "
      >
        {value}
      </p>

      <h3
        className="
          mt-1
          font-bold
          text-[#33251F]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-sm
          leading-6
          text-[#7A685D]
        "
      >
        {description}
      </p>
    </div>
  );
}


// ============================================================
// MILESTONE CARD
// ============================================================

function Milestone({
  title,
  description,
  completed,
}) {
  return (
    <div
      className={`
        rounded-[22px]
        border
        p-5
        ${
          completed
            ? "border-[#C65D2E]/20 bg-[#F1DFD0]"
            : "border-[#C65D2E]/10 bg-[#F8EEE4]"
        }
      `}
    >
      <div className="flex items-start gap-4">

        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            ${
              completed
                ? "bg-[#C65D2E] text-white"
                : "bg-[#E2D1C2] text-[#927E70]"
            }
          `}
        >
          {completed ? (
            <Check size={20} />
          ) : (
            <Target size={20} />
          )}
        </div>


        <div>

          <h3
            className="
              font-black
              text-[#33251F]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-sm
              leading-6
              text-[#7A685D]
            "
          >
            {description}
          </p>

          <p
            className={`
              mt-3
              text-xs
              font-bold
              uppercase
              tracking-wider
              ${
                completed
                  ? "text-[#C65D2E]"
                  : "text-[#927E70]"
              }
            `}
          >
            {completed ? "Completed" : "In progress"}
          </p>

        </div>

      </div>
    </div>
  );
}


// ============================================================
// MAIN PAGE
// ============================================================

export default function Achievements() {

  const [entries, setEntries] = useState([]);
  const [dailyGoal, setDailyGoal] = useState(10);
  const [loading, setLoading] = useState(true);


  // ==========================================================
  // FETCH USER DATA
  // ==========================================================

  const fetchData = async () => {

    try {

      setLoading(true);

      const [entriesResponse, profileResponse] =
        await Promise.all([
          api.get("/entries"),
          api.get("/auth/me"),
        ]);

      setEntries(
        entriesResponse.data.entries || []
      );

      setDailyGoal(
        Number(
          profileResponse.data.user.dailyGoal
        ) || 10
      );

    } catch (error) {

      console.error(
        "Failed to load Healthy Wins:",
        error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  // ==========================================================
  // CALCULATE PROGRESS
  // ==========================================================

  const stats = useMemo(() => {

    if (!entries.length) {

      return {
        startingAverage: dailyGoal,
        currentAverage: 0,
        reduction: 0,
        quitProgress: 0,
        cigarettesAvoided: 0,
        moneyAvoided: 0,
        loggedDays: 0,
      };

    }


    // --------------------------------------------------------
    // SORT ENTRIES BY DATE
    // --------------------------------------------------------

    const sorted = [...entries].sort(
      (a, b) =>
        getDate(a).getTime() -
        getDate(b).getTime()
    );


    // --------------------------------------------------------
    // GROUP CIGARETTES BY DAY
    // --------------------------------------------------------

    const dailyTotals = {};

    sorted.forEach((entry) => {

      const date = getDate(entry);

      const key =
        date.toISOString().slice(0, 10);

      dailyTotals[key] =
        (dailyTotals[key] || 0) +
        getQuantity(entry);

    });


    const days = Object.values(
      dailyTotals
    );


    // --------------------------------------------------------
    // STARTING AVERAGE
    // --------------------------------------------------------

    const firstDays =
      days.slice(0, Math.min(7, days.length));


    const startingAverage =
      firstDays.length
        ? firstDays.reduce(
            (sum, value) => sum + value,
            0
          ) / firstDays.length
        : dailyGoal;


    // --------------------------------------------------------
    // CURRENT AVERAGE
    // --------------------------------------------------------

    const recentDays =
      days.slice(-7);


    const currentAverage =
      recentDays.length
        ? recentDays.reduce(
            (sum, value) => sum + value,
            0
          ) / recentDays.length
        : 0;


    // --------------------------------------------------------
    // REDUCTION %
    // --------------------------------------------------------

    const reduction =
      startingAverage > 0
        ? Math.max(
            0,
            (
              (
                startingAverage -
                currentAverage
              ) /
              startingAverage
            ) * 100
          )
        : 0;


    // --------------------------------------------------------
    // QUITTING PROGRESS
    //
    // Starting average = 0%
    // Zero cigarettes = 100%
    // --------------------------------------------------------

    const quitProgress =
      startingAverage > 0
        ? Math.min(
            100,
            Math.max(
              0,
              (
                (
                  startingAverage -
                  currentAverage
                ) /
                startingAverage
              ) * 100
            )
          )
        : 0;


    // --------------------------------------------------------
    // ESTIMATED CIGARETTES AVOIDED
    // --------------------------------------------------------

    let cigarettesAvoided = 0;

    recentDays.forEach((value) => {

      if (value < startingAverage) {

        cigarettesAvoided +=
          startingAverage - value;

      }

    });


    // --------------------------------------------------------
    // ESTIMATED MONEY AVOIDED
    // --------------------------------------------------------

    const prices = sorted
      .map(
        (entry) =>
          Number(entry.price) || 0
      )
      .filter((price) => price > 0);


    const averagePrice =
      prices.length
        ? prices.reduce(
            (sum, price) =>
              sum + price,
            0
          ) / prices.length
        : 0;


    const moneyAvoided =
      cigarettesAvoided *
      averagePrice;


    return {
      startingAverage,
      currentAverage,
      reduction,
      quitProgress,
      cigarettesAvoided,
      moneyAvoided,
      loggedDays: Object.keys(
        dailyTotals
      ).length,
    };

  }, [entries, dailyGoal]);


  // ==========================================================
  // MILESTONES
  // ==========================================================

  const milestones = [

    {
      title: "First Step",

      description:
        "Log your first activity and start understanding your smoking pattern.",

      completed:
        entries.length >= 1,
    },


    {
      title: "Consistent Tracking",

      description:
        "Track your activity across 7 different days.",

      completed:
        stats.loggedDays >= 7,
    },


    {
      title: "Lowered Your Average",

      description:
        "Bring your recent daily average below your starting average.",

      completed:
        stats.reduction > 0,
    },


    {
      title: "Halfway to Quitting",

      description:
        "Reduce your recent average by at least 50%.",

      completed:
        stats.quitProgress >= 50,
    },


    {
      title: "Major Reduction",

      description:
        "Reach 75% progress toward your quitting goal.",

      completed:
        stats.quitProgress >= 75,
    },


    {
      title: "Quit Goal",

      description:
        "Reach a zero-cigarette recent average.",

      completed:
        stats.currentAverage === 0 &&
        entries.length > 0,
    },

  ];


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <AppLayout>

        <div
          className="
            min-h-screen
            bg-[#F6EDE3]
            px-6
            py-10
          "
        >

          <div className="mx-auto max-w-6xl">

            <div
              className="
                h-8
                w-56
                animate-pulse
                rounded-lg
                bg-[#E3D1C1]
              "
            />

            <div
              className="
                mt-6
                h-72
                animate-pulse
                rounded-[30px]
                bg-[#E3D1C1]
              "
            />

          </div>

        </div>

      </AppLayout>
    );
  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <AppLayout>

      <div
        className="
          min-h-screen
          bg-[#F6EDE3]
          text-[#33251F]
        "
      >

        <div
          className="
            mx-auto
            max-w-6xl
            px-5
            py-8
            md:px-8
            md:py-10
          "
        >

          <Header />


          {/* =================================================
              PAGE HEADER
              ================================================= */}

          <section className="mt-8">

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#C65D2E]
              "
            >
              Healthy Wins
            </p>


            <h1
              className="
                mt-2
                text-4xl
                font-black
                tracking-tight
                text-[#33251F]
                md:text-5xl
              "
            >
              You're moving forward.
            </h1>


            <p
              className="
                mt-3
                max-w-2xl
                text-base
                leading-7
                text-[#7A685D]
              "
            >
              Every reduction and every
              mindful decision brings you
              closer to quitting.
            </p>

          </section>


          {/* =================================================
              PROGRESS TOWARD QUITTING
              ================================================= */}

          <section
            className="
              mt-8
              rounded-[30px]
              bg-[#332923]
              p-7
              md:p-9
            "
          >

            <div
              className="
                flex
                flex-col
                gap-6
                md:flex-row
                md:items-end
                md:justify-between
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#C65D2E]
                  "
                >
                  Progress Toward Quitting
                </p>


                <h2
                  className="
                    mt-3
                    text-4xl
                    font-black
                    text-[#FFF8F1]
                    md:text-5xl
                  "
                >
                  {Math.round(
                    stats.quitProgress
                  )}
                  %
                </h2>


                <p
                  className="
                    mt-3
                    max-w-xl
                    text-sm
                    leading-6
                    text-[#C9B8AC]
                  "
                >
                  Your progress is based on
                  how much your recent cigarette
                  average has decreased from
                  where you started.
                </p>

              </div>


              <div
                className="
                  rounded-2xl
                  bg-[#C65D2E]/10
                  px-5
                  py-4
                "
              >

                <p
                  className="
                    text-xs
                    text-[#C9B8AC]
                  "
                >
                  Current average
                </p>


                <p
                  className="
                    mt-1
                    text-2xl
                    font-black
                    text-[#FFF8F1]
                  "
                >
                  {stats.currentAverage.toFixed(
                    1
                  )}
                </p>


                <p
                  className="
                    text-xs
                    text-[#C9B8AC]
                  "
                >
                  cigarettes / day
                </p>

              </div>

            </div>


            {/* PROGRESS BAR */}

            <div className="mt-8">

              <div
                className="
                  h-4
                  overflow-hidden
                  rounded-full
                  bg-[#4A3A31]
                "
              >

                <div
                  className="
                    h-full
                    rounded-full
                    bg-[#C65D2E]
                    transition-all
                    duration-700
                  "
                  style={{
                    width: `${Math.min(
                      stats.quitProgress,
                      100
                    )}%`,
                  }}
                />

              </div>


              <div
                className="
                  mt-3
                  flex
                  justify-between
                  text-xs
                  font-semibold
                  text-[#BCA99D]
                "
              >

                <span>
                  Starting:{" "}
                  {stats.startingAverage.toFixed(
                    1
                  )} / day
                </span>

                <span>
                  Goal: 0 / day
                </span>

              </div>

            </div>

          </section>


          {/* =================================================
              YOUR WINS
              ================================================= */}

          <section className="mt-10">

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#C65D2E]
              "
            >
              Your Wins
            </p>


            <h2
              className="
                mt-2
                text-2xl
                font-black
                text-[#33251F]
              "
            >
              Progress you've already made
            </h2>


            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >

              <WinCard
                icon={
                  <TrendingDown
                    size={21}
                  />
                }
                title="Reduction"
                value={`${Math.round(
                  stats.reduction
                )}%`}
                description="Your reduction from your starting daily average."
              />


              <WinCard
                icon={
                  <Cigarette
                    size={21}
                  />
                }
                title="Cigarettes Avoided"
                value={Math.round(
                  stats.cigarettesAvoided
                )}
                description="Estimated cigarettes avoided through your recent reduction."
              />


              <WinCard
                icon={
                  <Wallet
                    size={21}
                  />
                }
                title="Spending Avoided"
                value={money(
                  stats.moneyAvoided
                )}
                description="Estimated money you avoided spending by reducing cigarettes."
              />


              <WinCard
                icon={
                  <CalendarCheck
                    size={21}
                  />
                }
                title="Days Tracked"
                value={
                  stats.loggedDays
                }
                description="Different days where you've logged your activity."
              />

            </div>

          </section>


          {/* =================================================
              MILESTONES
              ================================================= */}

          <section className="mt-10">

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#C65D2E]
              "
            >
              Milestones
            </p>


            <h2
              className="
                mt-2
                text-2xl
                font-black
                text-[#33251F]
              "
            >
              Your quitting journey
            </h2>


            <p
              className="
                mt-2
                text-sm
                leading-6
                text-[#7A685D]
              "
            >
              These milestones recognize
              meaningful progress rather than
              points or XP.
            </p>


            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
              "
            >

              {milestones.map(
                (milestone) => (
                  <Milestone
                    key={
                      milestone.title
                    }
                    title={
                      milestone.title
                    }
                    description={
                      milestone.description
                    }
                    completed={
                      milestone.completed
                    }
                  />
                )
              )}

            </div>

          </section>


          {/* =================================================
              BOTTOM MESSAGE
              ================================================= */}

          <section
            className="
              mt-10
              rounded-[26px]
              border
              border-[#C65D2E]/15
              bg-[#F1DFD0]
              p-7
              text-center
            "
          >

            <h2
              className="
                text-2xl
                font-black
                text-[#33251F]
              "
            >
              Keep going.
            </h2>


            <p
              className="
                mx-auto
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-[#7A685D]
              "
            >
              Your progress doesn't need to
              be perfect. Every cigarette you
              avoid and every mindful choice
              you make moves you forward.
            </p>

          </section>


          <div className="h-12" />

        </div>

      </div>

    </AppLayout>
  );
}