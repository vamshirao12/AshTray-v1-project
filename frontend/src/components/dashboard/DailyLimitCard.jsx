import {
  ShieldCheck,
  Pencil,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import GlassCard from "../ui/GlassCard";
import PrimaryButton from "../ui/PrimaryButton";

const DailyLimitCard = ({
  todayCigarettes,
  dailyLimit,
  onEdit,
}) => {
  const remaining = Math.max(
    dailyLimit - todayCigarettes,
    0
  );

  const exceeded = todayCigarettes > dailyLimit;

  return (
    <GlassCard className="mt-8">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex items-center gap-3">

            <div className="w-14 h-14 rounded-2xl bg-[#FB923C]/15 flex items-center justify-center">
              <ShieldCheck
                size={28}
                className="text-[#FB923C]"
              />
            </div>

            <div>

              <p className="uppercase tracking-[0.25em] text-xs text-[#FB923C]">
                Today's Plan
              </p>

              <h2 className="text-3xl font-black text-white mt-1">
                Daily Limit
              </h2>

            </div>

          </div>

          <p className="text-[#A8A29E] mt-5 max-w-xl leading-7">
            Your daily limit is a personal guide to help reduce smoking
            gradually. It isn't about being perfect—it's about making healthier
            choices over time.
          </p>

        </div>

        <PrimaryButton
          variant="secondary"
          onClick={onEdit}
        >
          <Pencil size={18} />
          <span className="ml-2">
            Adjust
          </span>
        </PrimaryButton>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">

        <div className="rounded-3xl bg-[#2A2523] p-6 border border-[#FB923C]/10">

          <p className="text-[#A8A29E] text-sm">
            Today's Limit
          </p>

          <h3 className="text-5xl font-black text-white mt-2">
            {dailyLimit}
          </h3>

          <p className="text-[#D6D3D1] mt-3">
            cigarettes
          </p>

        </div>

        <div className="rounded-3xl bg-[#2A2523] p-6 border border-[#FB923C]/10">

          <p className="text-[#A8A29E] text-sm">
            Logged Today
          </p>

          <h3 className="text-5xl font-black text-white mt-2">
            {todayCigarettes}
          </h3>

          <p className="text-[#D6D3D1] mt-3">
            cigarettes
          </p>

        </div>

      </div>

      <div className="mt-8 rounded-3xl bg-[#FB923C]/10 border border-[#FB923C]/15 p-6">

        {!exceeded ? (
          <div className="flex items-start gap-4">

            <CheckCircle2
              className="text-[#FB923C] mt-1"
              size={24}
            />

            <div>

              <h3 className="text-xl font-bold text-white">
                You're within today's plan
              </h3>

              <p className="text-[#D6D3D1] mt-2">
                {remaining}{" "}
                {remaining === 1 ? "cigarette remains" : "cigarettes remain"} in
                today's personal limit. Small reductions build lasting habits.
              </p>

            </div>

          </div>
        ) : (
          <div className="flex items-start gap-4">

            <AlertCircle
              className="text-[#FB923C] mt-1"
              size={24}
            />

            <div>

              <h3 className="text-xl font-bold text-white">
                Today was more challenging
              </h3>

              <p className="text-[#D6D3D1] mt-2">
                You went over your planned limit today. That's okay—one day
                doesn't define your progress. Tomorrow is another opportunity to
                take one healthier step.
              </p>

            </div>

          </div>
        )}

      </div>

      <div className="mt-6 rounded-3xl bg-[#2A2523] border border-[#FB923C]/10 p-6">

        <p className="text-[#FB923C] font-semibold">
          🌿 Today's Focus
        </p>

        <p className="text-[#D6D3D1] mt-3 leading-7">
          Before your next cigarette, try waiting for 10 minutes and drink a
          glass of water. Even a short pause can help reduce automatic habits
          over time.
        </p>

      </div>

    </GlassCard>
  );
};

export default DailyLimitCard;