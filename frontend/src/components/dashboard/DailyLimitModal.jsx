import { useState } from "react";
import api from "../../services/api";

import GlassCard from "../ui/GlassCard";
import PrimaryButton from "../ui/PrimaryButton";
import SecondaryButton from "../ui/SecondaryButton";

const DailyLimitModal = ({
  currentLimit,
  onClose,
  onLimitUpdated,
}) => {
  const [limit, setLimit] = useState(currentLimit);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        "/auth/daily-goal",
        {
          dailyGoal: Number(limit),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onLimitUpdated();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update daily limit");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
      <div className="w-full max-w-md">

        <GlassCard>

          <div className="space-y-6">

            <div>

              <p className="text-sm font-semibold uppercase tracking-wider text-[#FB923C]">
                Daily Limit
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                Set Your Daily Limit
              </h2>

              <p className="mt-2 text-[#A8A29E]">
                Choose the maximum number of cigarettes you want to allow
                yourself today. Lowering this number gradually can make the
                goal feel more achievable.
              </p>

            </div>

            <input
              type="number"
              min="1"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="
                w-full
                rounded-2xl
                border
                border-[#FB923C]/15
                bg-[#2A2523]
                px-4
                py-4
                text-xl
                text-white
                outline-none
                focus:border-[#FB923C]
              "
            />

            <div className="flex gap-4">

              <SecondaryButton
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </SecondaryButton>

              <PrimaryButton
                className="flex-1"
                onClick={handleSave}
              >
                Save Limit
              </PrimaryButton>

            </div>

          </div>

        </GlassCard>

      </div>
    </div>
  );
};

export default DailyLimitModal;