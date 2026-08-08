import GlassCard from "../ui/GlassCard";

export default function HealthSnapshot({
  moneySaved = 0,
  healthierChoices = 0,
  reduced = 0,
}) {
  return (
    <GlassCard className="mt-8">

      <div className="grid gap-4 md:grid-cols-3">

        <div className="rounded-3xl border border-[#C65D2E]/10 bg-[#F1DFD0] p-5">

          <p className="text-sm text-[#7A685D]">
            Money Spent Today
          </p>

          <h3 className="mt-2 text-3xl font-black text-[#33251F]">
            ₹{Number(moneySaved).toFixed(0)}
          </h3>

        </div>

        <div className="rounded-3xl border border-[#C65D2E]/10 bg-[#F1DFD0] p-5">

          <p className="text-sm text-[#7A685D]">
            Today's Activity
          </p>

          <h3 className="mt-2 text-3xl font-black text-[#33251F]">
            {healthierChoices}
          </h3>

        </div>

        <div className="rounded-3xl border border-[#C65D2E]/10 bg-[#F1DFD0] p-5">

          <p className="text-sm text-[#7A685D]">
            Remaining Today
          </p>

          <h3 className="mt-2 text-3xl font-black text-[#33251F]">
            {reduced}
          </h3>

          <p className="mt-2 text-xs text-[#927E70]">
            Within your personal limit.
          </p>

        </div>

      </div>

    </GlassCard>
  );
}