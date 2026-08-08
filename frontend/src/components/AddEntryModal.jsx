import { useState } from "react";
import GlassCard from "./ui/GlassCard";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";
import api from "../services/api";

const TRIGGERS = [
  {
    value: "Coffee",
    label: "Coffee",
    icon: "☕",
  },
  {
    value: "Stress",
    label: "Stress",
    icon: "😰",
  },
  {
    value: "After a meal",
    label: "After a meal",
    icon: "🍽️",
  },
  {
    value: "Social",
    label: "Social",
    icon: "👥",
  },
  {
    value: "Boredom",
    label: "Boredom",
    icon: "😴",
  },
  {
    value: "Habit",
    label: "Habit",
    icon: "🧠",
  },
  {
    value: "Other",
    label: "Other",
    icon: "✦",
  },
];

const AddEntryModal = ({ onClose, onEntryAdded }) => {
  const [formData, setFormData] = useState({
    brand: "",
    price: "",
    quantity: "",
    trigger: "",
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTriggerSelect = (trigger) => {
    setFormData((prev) => ({
      ...prev,
      trigger,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    if (!formData.brand.trim()) {
      alert("Please enter the brand.");
      return;
    }

    if (!formData.price || Number(formData.price) < 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const payload = {
        brand: formData.brand.trim(),
        price: Number(formData.price),
        quantity:
          formData.quantity === ""
            ? 1
            : Number(formData.quantity),

        trigger:
          formData.trigger || "Not specified",
      };

      await api.post("/entries", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await onEntryAdded();

      onClose();
    } catch (error) {
      console.error("Failed to add entry:", error);

      alert(
        error.response?.data?.message ||
          "Failed to add entry"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-[#33251F]/35
        p-4
        backdrop-blur-sm
      "
    >
      <GlassCard
        className="
          w-full
          max-w-xl
          border
          border-[#E4D1BD]
          bg-[#FFF9F1]
          p-7
          shadow-2xl
        "
      >
        {/* Header */}

        <div className="mb-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
            Daily Check-in
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#33251F]">
            Log an activity
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#7A685D]">
            Record what happened and what may have triggered it.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5">

            {/* Brand */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#5F4D42]">
                Brand
              </label>

              <input
                name="brand"
                placeholder="e.g. Marlboro"
                value={formData.brand}
                onChange={handleChange}
                className="
                  w-full
                  rounded-2xl
                  border
                  border-[#E4D1BD]
                  bg-[#F6EEE4]
                  p-4
                  text-[#33251F]
                  placeholder:text-[#A99484]
                  outline-none
                  transition
                  focus:border-[#C65D2E]
                  focus:ring-2
                  focus:ring-[#C65D2E]/10
                "
              />
            </div>

            {/* Price + Quantity */}

            <div className="grid gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5F4D42]">
                  Price
                </label>

                <input
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="₹0"
                  value={formData.price}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#E4D1BD]
                    bg-[#F6EEE4]
                    p-4
                    text-[#33251F]
                    placeholder:text-[#A99484]
                    outline-none
                    focus:border-[#C65D2E]
                    focus:ring-2
                    focus:ring-[#C65D2E]/10
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#5F4D42]">
                  Number of cigarettes
                </label>

                <input
                  name="quantity"
                  type="number"
                  min="1"
                  placeholder="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#E4D1BD]
                    bg-[#F6EEE4]
                    p-4
                    text-[#33251F]
                    placeholder:text-[#A99484]
                    outline-none
                    focus:border-[#C65D2E]
                    focus:ring-2
                    focus:ring-[#C65D2E]/10
                  "
                />
              </div>

            </div>

            {/* Trigger */}

            <div>
              <label className="mb-3 block text-sm font-semibold text-[#5F4D42]">
                What triggered it?
              </label>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                {TRIGGERS.map((trigger) => {
                  const selected =
                    formData.trigger === trigger.value;

                  return (
                    <button
                      key={trigger.value}
                      type="button"
                      onClick={() =>
                        handleTriggerSelect(trigger.value)
                      }
                      className={`
                        rounded-2xl
                        border
                        p-3
                        text-left
                        transition-all
                        duration-200
                        ${
                          selected
                            ? "border-[#C65D2E] bg-[#C65D2E]/10 text-[#9F4523] shadow-sm"
                            : "border-[#E4D1BD] bg-[#F6EEE4] text-[#5F4D42] hover:border-[#C65D2E]/50 hover:bg-[#F2E4D5]"
                        }
                      `}
                    >
                      <span className="block text-xl">
                        {trigger.icon}
                      </span>

                      <span className="mt-1 block text-xs font-semibold">
                        {trigger.label}
                      </span>
                    </button>
                  );
                })}

              </div>

              <p className="mt-2 text-xs text-[#9A887A]">
                Choosing a trigger helps Analytics understand your
                patterns over time.
              </p>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-8 flex gap-3">

            <SecondaryButton
              type="button"
              className="
                flex-1
                !border-[#DCC7B4]
                !bg-[#F6EEE4]
                !text-[#5F4D42]
              "
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </SecondaryButton>

            <PrimaryButton
              type="submit"
              className="
                flex-1
                !bg-[#C65D2E]
                !text-white
                hover:!bg-[#9F4523]
              "
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Activity"}
            </PrimaryButton>

          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default AddEntryModal;