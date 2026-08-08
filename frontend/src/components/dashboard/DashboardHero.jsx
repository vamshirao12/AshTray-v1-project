import {
  Sun,
  CloudSun,
  Moon,
  Sunset,
  Wallet,
} from "lucide-react";

const DashboardHero = ({
  todayLogs = 0,
  todayCigarettes = 0,
  todayMoney = 0,
  dailyLimit = 10,
}) => {
  const hour = new Date().getHours();

  let greeting = "Good Night";
  let Icon = Moon;

  if (hour < 12) {
    greeting = "Good Morning";
    Icon = Sun;
  } else if (hour < 17) {
    greeting = "Good Afternoon";
    Icon = CloudSun;
  } else if (hour < 21) {
    greeting = "Good Evening";
    Icon = Sunset;
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const remaining = Math.max(
    Number(dailyLimit) - Number(todayCigarettes),
    0
  );

  const formattedMoney = `₹${Number(todayMoney || 0).toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    }
  )}`;

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-[#C65D2E]/10 bg-[#F8EEE4] p-7 shadow-sm md:p-9">

      {/* Decorative shape */}

      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#C65D2E]/5 blur-3xl" />

      <div className="relative z-10">

        {/* Greeting */}

        <div className="flex items-center gap-3 text-[#C65D2E]">

          <Icon size={21} />

          <span className="font-semibold tracking-wide">
            {greeting}
          </span>

        </div>

        {/* Date */}

        <p className="mt-5 text-sm font-medium uppercase tracking-[0.18em] text-[#9A887A]">
          {today}
        </p>

        {/* Heading */}

        <h1 className="mt-4 text-4xl font-black leading-tight text-[#33251F] md:text-5xl">
          Welcome back.
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-[#6F5C50]">
          Every healthier choice you make today is a step toward
          the life you're building.
        </p>

        {/* Intention */}

        <div className="mt-8 rounded-[24px] border border-[#C65D2E]/10 bg-[#F1DFD0] p-5">

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
            Today's Intention
          </p>

          <h2 className="mt-3 text-xl font-bold text-[#33251F]">
            Pause before you act.
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#7A685D]">
            If you notice a craving today, try waiting for just
            five minutes before deciding what to do. Even a short
            pause can help you make a more mindful choice.
          </p>

        </div>

        {/* Today's Summary */}

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

          {/* Logs */}

          <div className="rounded-2xl border border-[#C65D2E]/10 bg-[#FFF9F1] p-4">

            <p className="text-xs font-medium text-[#9A887A]">
              Today's Logs
            </p>

            <p className="mt-1 text-2xl font-black text-[#33251F]">
              {todayLogs}
            </p>

          </div>

          {/* Cigarettes */}

          <div className="rounded-2xl border border-[#C65D2E]/10 bg-[#FFF9F1] p-4">

            <p className="text-xs font-medium text-[#9A887A]">
              Cigarettes Today
            </p>

            <p className="mt-1 text-2xl font-black text-[#33251F]">
              {todayCigarettes}
            </p>

          </div>

          {/* Money */}

          <div className="rounded-2xl border border-[#C65D2E]/10 bg-[#FFF9F1] p-4">

            <div className="flex items-center justify-between">

              <p className="text-xs font-medium text-[#9A887A]">
                Money Spent Today
              </p>

              <Wallet
                size={16}
                className="text-[#C65D2E]"
              />

            </div>

            <p className="mt-1 text-2xl font-black text-[#33251F]">
              {formattedMoney}
            </p>

          </div>

        </div>

        {/* Daily Limit */}

        <div className="mt-3 flex items-center justify-between rounded-2xl border border-[#C65D2E]/20 bg-[#C65D2E]/5 px-5 py-4">

          <div>

            <p className="text-xs font-bold uppercase tracking-wider text-[#9F4523]">
              Daily Limit
            </p>

            <p className="mt-1 text-sm text-[#7A685D]">
              {dailyLimit} cigarettes
            </p>

          </div>

          <div className="text-right">

            <p className="text-xs text-[#9A887A]">
              Remaining
            </p>

            <p className="text-2xl font-black text-[#C65D2E]">
              {remaining}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default DashboardHero;