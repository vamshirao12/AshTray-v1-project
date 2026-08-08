import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import GlassCard from "../components/ui/GlassCard";

import {
  HeartPulse,
  Clock3,
  Droplets,
  Footprints,
  Wind,
  Hand,
  CheckCircle2,
} from "lucide-react";

const tips = [
  {
    icon: Clock3,
    title: "Delay the Craving",
    text: "Give yourself 10 minutes before making a decision. A craving can rise and fall without you acting on it.",
  },
  {
    icon: Droplets,
    title: "Drink Some Water",
    text: "Slowly drink a glass of water. It gives you something to focus on while the craving passes.",
  },
  {
    icon: Footprints,
    title: "Change Your Environment",
    text: "Step outside, walk around, stretch, or move away from the place where you normally smoke.",
  },
  {
    icon: Hand,
    title: "Keep Your Hands Busy",
    text: "Use your phone, write something down, tidy your desk, or do another small activity until the urge settles.",
  },
];

export default function CravingHelp() {
  const [seconds, setSeconds] = useState(600);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);

  // ============================================================
  // CRAVING TIMER
  // ============================================================

  useEffect(() => {
    if (!running) return;

    if (seconds <= 0) {
      setRunning(false);
      setCompleted(true);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((current) => current - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, seconds]);

  const formatTime = (value) => {
    const minutes = Math.floor(value / 60);
    const remainingSeconds = value % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const startTimer = () => {
    setCompleted(false);
    setRunning(true);
  };

  const resetTimer = () => {
    setRunning(false);
    setCompleted(false);
    setSeconds(600);
  };

  return (
    <AppLayout>
      <div className="space-y-8">

        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <GlassCard>
          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C65D2E]/10">
              <HeartPulse
                size={30}
                className="text-[#C65D2E]"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
                Support
              </p>

              <h1 className="mt-1 text-4xl font-black text-[#33251F]">
                Craving Help
              </h1>

              <p className="mt-2 text-[#7A685D]">
                Small actions can help you ride out a difficult moment.
              </p>
            </div>

          </div>
        </GlassCard>

        {/* ================================================== */}
        {/* 10 MINUTE RESET */}
        {/* ================================================== */}

        <GlassCard>

          <div className="text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#C65D2E]/10">
              <Wind
                size={30}
                className="text-[#C65D2E]"
              />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
              Take a moment
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#33251F]">
              Ride Out the Craving
            </h2>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-[#7A685D]">
              Try giving yourself ten minutes before deciding what to do.
              Use the timer to focus on getting through this moment.
            </p>

            {/* TIMER */}

            <div className="mt-8">

              <div className="text-6xl font-black tracking-tight text-[#33251F]">
                {formatTime(seconds)}
              </div>

              <p className="mt-2 text-sm text-[#9A887A]">
                {completed
                  ? "You made it through the 10-minute reset."
                  : running
                  ? "Keep going. One minute at a time."
                  : "Start when a craving hits."}
              </p>

            </div>

            {/* ACTIONS */}

            <div className="mt-7 flex flex-wrap justify-center gap-3">

              {!running && !completed && (
                <button
                  type="button"
                  onClick={startTimer}
                  className="
                    rounded-2xl
                    bg-[#C65D2E]
                    px-7
                    py-3
                    font-bold
                    text-white
                    transition
                    hover:bg-[#B95025]
                  "
                >
                  Start 10-Minute Reset
                </button>
              )}

              {running && (
                <button
                  type="button"
                  onClick={() => setRunning(false)}
                  className="
                    rounded-2xl
                    border
                    border-[#C65D2E]/15
                    bg-[#FFF9F1]
                    px-7
                    py-3
                    font-bold
                    text-[#6F5C50]
                    transition
                    hover:bg-[#F8EEE4]
                  "
                >
                  Pause
                </button>
              )}

              {completed && (
                <div className="flex items-center gap-2 rounded-2xl bg-[#F1DFD0] px-5 py-3 font-bold text-[#6F5C50]">
                  <CheckCircle2
                    size={19}
                    className="text-[#C65D2E]"
                  />
                  Reset Complete
                </div>
              )}

              {(running || completed || seconds !== 600) && (
                <button
                  type="button"
                  onClick={resetTimer}
                  className="
                    rounded-2xl
                    border
                    border-[#C65D2E]/15
                    px-6
                    py-3
                    font-bold
                    text-[#6F5C50]
                    transition
                    hover:bg-[#F8EEE4]
                  "
                >
                  Reset
                </button>
              )}

            </div>

          </div>

        </GlassCard>

        {/* ================================================== */}
        {/* QUICK ACTIONS */}
        {/* ================================================== */}

        <section>

          <div className="mb-5">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
              Quick Actions
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#33251F]">
              Try something different.
            </h2>

            <p className="mt-2 text-[#7A685D]">
              Pick one small action and give yourself a few minutes.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {tips.map((tip) => {
              const Icon = tip.icon;

              return (
                <div
                  key={tip.title}
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

                  <div className="flex items-start gap-4">

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C65D2E]/10">
                      <Icon
                        size={24}
                        className="text-[#C65D2E]"
                      />
                    </div>

                    <div>

                      <h3 className="text-xl font-black text-[#33251F]">
                        {tip.title}
                      </h3>

                      <p className="mt-2 leading-7 text-[#7A685D]">
                        {tip.text}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* ================================================== */}
        {/* FINAL REMINDER */}
        {/* ================================================== */}

        <div
          className="
            rounded-[28px]
            border
            border-[#C65D2E]/10
            bg-[#332923]
            p-7
            md:p-9
          "
        >

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
            Remember
          </p>

          <h2 className="mt-3 text-2xl font-black text-[#FFF8F1]">
            A craving doesn't have to become a cigarette.
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-[#C9B8AC]">
            You don't have to solve everything at once. Focus on getting
            through the next few minutes and making one choice you're proud of.
          </p>

        </div>

      </div>
    </AppLayout>
  );
}