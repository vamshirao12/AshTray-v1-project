import {
  Plus,
  Trash2,
  Clock3,
  Cigarette,
  IndianRupee,
  Hash,
} from "lucide-react";

import GlassCard from "../ui/GlassCard";
import SectionHeader from "../ui/SectionHeader";
import PrimaryButton from "../ui/PrimaryButton";

const EntriesCard = ({
  entries,
  onAddEntry,
  onDelete,
}) => {
  return (
    <GlassCard>

      <SectionHeader
        title="Today's Activity"
        subtitle="Every activity you log helps you understand your habits."
        action={
          <PrimaryButton onClick={onAddEntry}>
            <Plus size={18} />

            <span className="ml-2">
              Log Activity
            </span>
          </PrimaryButton>
        }
      />

      {entries.length === 0 ? (
        <div className="py-20 text-center">

          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C65D2E]/10">
            <Cigarette
              size={28}
              className="text-[#C65D2E]"
            />
          </div>

          <h3 className="text-3xl font-bold text-[#33251F]">
            No activity logged today
          </h3>

          <p className="mx-auto mt-4 max-w-lg leading-7 text-[#7A685D]">
            Every cigarette you log helps AshTray understand
            your habits and provide better insights. Start by
            logging your first cigarette today.
          </p>

          <PrimaryButton
            className="mx-auto mt-8"
            onClick={onAddEntry}
          >
            <Plus size={18} />

            <span className="ml-2">
              Add First Entry
            </span>
          </PrimaryButton>

        </div>
      ) : (
        <div className="space-y-5">

          {entries.map((entry, index) => {

            const quantity = Number(entry.quantity || 1);
            const pricePerStick = Number(entry.price || 0);
            const totalSpent = quantity * pricePerStick;

            const time = new Date(
              entry.createdAt
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={entry._id}
                className="
                  rounded-3xl
                  border
                  border-[#C65D2E]/10
                  bg-[#F1DFD0]
                  p-6
                  transition-all
                  duration-300
                  hover:border-[#C65D2E]/20
                "
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 gap-4">

                    {/* Cigarette Icon */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#C65D2E]/10">
                      <Cigarette
                        size={24}
                        className="text-[#C65D2E]"
                      />
                    </div>

                    <div className="min-w-0">

                      <h3 className="text-2xl font-bold text-[#33251F]">
                        {entry.brand}
                      </h3>

                      <div className="mt-5 grid gap-3 md:grid-cols-3">

                        {/* Price */}
                        <div className="rounded-2xl border border-[#C65D2E]/5 bg-[#FFF9F1] px-4 py-3">

                          <div className="flex items-center gap-2 text-sm text-[#7A685D]">
                            <IndianRupee size={14} />
                            Price / Stick
                          </div>

                          <p className="mt-2 text-xl font-bold text-[#33251F]">
                            ₹{pricePerStick}
                          </p>

                        </div>

                        {/* Quantity */}
                        <div className="rounded-2xl border border-[#C65D2E]/5 bg-[#FFF9F1] px-4 py-3">

                          <div className="flex items-center gap-2 text-sm text-[#7A685D]">
                            <Hash size={14} />
                            Quantity
                          </div>

                          <p className="mt-2 text-xl font-bold text-[#33251F]">
                            {quantity}
                          </p>

                        </div>

                        {/* Total */}
                        <div className="rounded-2xl border border-[#C65D2E]/20 bg-[#C65D2E]/5 px-4 py-3">

                          <div className="flex items-center gap-2 text-sm text-[#C65D2E]">
                            <IndianRupee size={14} />
                            Total
                          </div>

                          <p className="mt-2 text-2xl font-black text-[#C65D2E]">
                            ₹{totalSpent}
                          </p>

                        </div>

                      </div>

                      <div className="mt-6 flex flex-wrap gap-6 text-sm text-[#7A685D]">

                        <div className="flex items-center gap-2">
                          <Clock3 size={16} />
                          {time}
                        </div>

                        <div>
                          Log #{entries.length - index}
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this activity?"
                        )
                      ) {
                        onDelete(entry._id);
                      }
                    }}
                    className="
                      rounded-xl
                      p-3
                      text-[#A64B35]
                      transition
                      hover:bg-[#C65D2E]/10
                    "
                    aria-label="Delete activity"
                  >
                    <Trash2 size={20} />
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </GlassCard>
  );
};

export default EntriesCard;