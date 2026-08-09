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
    <section
      className="
        relative
        overflow-hidden
        rounded-[22px]
        border
        border-[#C65D2E]/10
        bg-[#FFF9F1]
        p-4
        sm:rounded-[26px]
        sm:p-6
        md:p-8
        lg:rounded-[28px]
        lg:p-10
      "
    >

      {/* Decorative Shape */}
      <div
        className="
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[#C65D2E]/5
          blur-3xl
          sm:-right-20
          sm:-top-20
          sm:h-56
          sm:w-56
          md:h-64
          md:w-64
        "
      />

      <div className="relative z-10">

        {/* Greeting */}
        <div className="flex items-center gap-2 text-[#C65D2E] sm:gap-3">

          <Icon
            size={18}
            strokeWidth={2}
            className="shrink-0 sm:h-[21px] sm:w-[21px]"
          />

          <span className="text-sm font-semibold tracking-wide sm:text-base">
            {greeting}
          </span>

        </div>


        {/* Date */}
        <p
          className="
            mt-3
            text-[10px]
            font-medium
            uppercase
            tracking-[0.13em]
            text-[#9A887A]
            sm:mt-4
            sm:text-xs
            sm:tracking-[0.18em]
            md:mt-5
          "
        >
          {today}
        </p>


        {/* Heading */}
        <h1
          className="
            mt-2
            max-w-full
            text-[2rem]
            font-black
            leading-[1.05]
            tracking-tight
            text-[#33251F]
            sm:mt-3
            sm:text-4xl
            md:mt-4
            md:text-5xl
          "
        >
          Welcome back.
        </h1>


        {/* Description */}
        <p
          className="
            mt-3
            max-w-xl
            text-sm
            leading-6
            text-[#6F5C50]
            sm:mt-4
            sm:text-base
            sm:leading-7
            md:mt-5
          "
        >
          Every healthier choice you make today is a step toward
          the life you're building.
        </p>


        {/* Today's Intention */}
        <div
          className="
            mt-5
            rounded-[18px]
            border
            border-[#C65D2E]/10
            bg-[#F1DFD0]
            p-4
            sm:mt-6
            sm:rounded-[22px]
            sm:p-5
            md:mt-8
            md:rounded-[24px]
          "
        >

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#C65D2E]
              sm:text-xs
              sm:tracking-[0.2em]
            "
          >
            Today's Intention
          </p>

          <h2
            className="
              mt-2
              text-lg
              font-bold
              leading-tight
              text-[#33251F]
              sm:mt-3
              sm:text-xl
            "
          >
            Pause before you act.
          </h2>

          <p
            className="
              mt-1.5
              text-sm
              leading-5
              text-[#7A685D]
              sm:mt-2
              sm:leading-6
            "
          >
            If you notice a craving today, try waiting for just
            five minutes before deciding what to do. Even a short
            pause can help you make a more mindful choice.
          </p>

        </div>


        {/* Today's Summary */}
        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-2
            sm:mt-6
            sm:grid-cols-3
            sm:gap-3
            md:mt-8
          "
        >

          {/* Logs */}
          <div
            className="
              rounded-2xl
              border
              border-[#C65D2E]/10
              bg-[#FFF9F1]
              px-4
              py-3
              sm:p-4
            "
          >

            <p className="text-[11px] font-medium text-[#9A887A] sm:text-xs">
              Today's Logs
            </p>

            <p className="mt-0.5 text-xl font-black text-[#33251F] sm:text-2xl">
              {todayLogs}
            </p>

          </div>


          {/* Cigarettes */}
          <div
            className="
              rounded-2xl
              border
              border-[#C65D2E]/10
              bg-[#FFF9F1]
              px-4
              py-3
              sm:p-4
            "
          >

            <p className="text-[11px] font-medium text-[#9A887A] sm:text-xs">
              Cigarettes Today
            </p>

            <p className="mt-0.5 text-xl font-black text-[#33251F] sm:text-2xl">
              {todayCigarettes}
            </p>

          </div>


          {/* Money */}
          <div
            className="
              rounded-2xl
              border
              border-[#C65D2E]/10
              bg-[#FFF9F1]
              px-4
              py-3
              sm:p-4
            "
          >

            <div className="flex items-center justify-between gap-2">

              <p className="text-[11px] font-medium text-[#9A887A] sm:text-xs">
                Money Spent Today
              </p>

              <Wallet
                size={15}
                className="shrink-0 text-[#C65D2E] sm:h-4 sm:w-4"
              />

            </div>

            <p className="mt-0.5 text-xl font-black text-[#33251F] sm:text-2xl">
              {formattedMoney}
            </p>

          </div>

        </div>


        {/* Daily Limit */}
        <div
          className="
            mt-2
            flex
            items-center
            justify-between
            gap-4
            rounded-2xl
            border
            border-[#C65D2E]/20
            bg-[#C65D2E]/5
            px-4
            py-3
            sm:mt-3
            sm:px-5
            sm:py-4
          "
        >

          <div className="min-w-0">

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[#9F4523]
                sm:text-xs
              "
            >
              Daily Limit
            </p>

            <p className="mt-0.5 text-xs text-[#7A685D] sm:mt-1 sm:text-sm">
              {dailyLimit} cigarettes
            </p>

          </div>


          <div className="shrink-0 text-right">

            <p className="text-[10px] text-[#9A887A] sm:text-xs">
              Remaining
            </p>

            <p className="text-xl font-black text-[#C65D2E] sm:text-2xl">
              {remaining}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default DashboardHero;