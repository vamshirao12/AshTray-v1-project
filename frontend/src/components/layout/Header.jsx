import PrimaryButton from "../ui/PrimaryButton";
import {
  Plus,
  Sun,
  CloudSun,
  Sunset,
  Moon,
} from "lucide-react";

export default function Header({
  action,
  showIntention = false,
}) {
  const hour = new Date().getHours();

  let greeting = "Good Night";
  let GreetingIcon = Moon;

  if (hour < 12) {
    greeting = "Good Morning";
    GreetingIcon = Sun;
  } else if (hour < 17) {
    greeting = "Good Afternoon";
    GreetingIcon = CloudSun;
  } else if (hour < 21) {
    greeting = "Good Evening";
    GreetingIcon = Sunset;
  }

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
    }
  );

  return (
    <header className="mb-10">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">

        <div>

          <div className="flex items-center gap-2">

            <GreetingIcon
              size={17}
              className="text-[#C65D2E]"
            />

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C65D2E]">
              {today}
            </p>

          </div>

          <h1 className="mt-3 text-5xl font-black text-[#33251F]">
            {greeting}
          </h1>

          <p className="mt-4 max-w-xl text-lg leading-8 text-[#7A685D]">
            Every healthier choice you make today is a step toward
            the life you're building.
          </p>

        </div>

        {action && (
          <PrimaryButton
            onClick={action.onClick}
            className="self-start"
          >
            <Plus size={18} />

            <span className="ml-2">
              Log Activity
            </span>
          </PrimaryButton>
        )}

      </div>

      {showIntention && (
        <div className="mt-8 rounded-[28px] border border-[#C65D2E]/15 bg-[#F1DFD0] p-7">

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C65D2E]">
            Today's Intention
          </p>

          <h2 className="mt-3 text-2xl font-bold text-[#33251F]">
            Pause before you act.
          </h2>

          <p className="mt-4 leading-8 text-[#7A685D]">
            If you notice a craving today, try waiting for five
            minutes before deciding what to do.
          </p>

        </div>
      )}

    </header>
  );
}