import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import GlassCard from "../components/ui/GlassCard";

import api from "../services/api";

export default function Settings() {
  const [dailyLimit, setDailyLimit] = useState(10);

  const [email, setEmail] = useState("");

  const [reminderEnabled, setReminderEnabled] =
    useState(true);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ============================================================
  // LOAD SETTINGS
  // ============================================================

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await api.get("/auth/me");

        const user =
          response.data.user;

        setDailyLimit(
          Number(user?.dailyGoal) || 10
        );

        setEmail(
          user?.email || ""
        );

        const storedReminder =
          localStorage.getItem(
            "ashtray_daily_reminder"
          );

        if (
          storedReminder !== null
        ) {
          setReminderEnabled(
            storedReminder === "true"
          );
        }

      } catch (err) {
        console.error(
          "Failed to load settings:",
          err
        );

        setError(
          err.response?.data?.message ||
          "Unable to load your settings."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  // ============================================================
  // DAILY LIMIT
  // ============================================================

  const saveDailyLimit = async () => {
    const limit = Number(dailyLimit);

    if (
      !Number.isFinite(limit) ||
      limit < 1
    ) {
      setError(
        "Please enter a daily limit of at least 1."
      );

      setMessage("");

      return;
    }

    if (limit > 100) {
      setError(
        "Please enter a daily limit of 100 or less."
      );

      setMessage("");

      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      await api.put(
        "/auth/daily-goal",
        {
          dailyGoal: limit,
        }
      );

      setDailyLimit(limit);

      setMessage(
        "Daily limit updated successfully."
      );

    } catch (err) {
      console.error(
        "Failed to save daily limit:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to update your daily limit."
      );

    } finally {
      setSaving(false);
    }
  };

  // ============================================================
  // REMINDER PREFERENCE
  // ============================================================

  const toggleReminder = () => {
    const next =
      !reminderEnabled;

    setReminderEnabled(next);

    localStorage.setItem(
      "ashtray_daily_reminder",
      String(next)
    );

    setMessage(
      next
        ? "Daily reminder preference enabled."
        : "Daily reminder preference disabled."
    );

    setError("");
  };

  // ============================================================
  // SIGN OUT
  // ============================================================

  const signOut = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <AppLayout>

        <GlassCard>

          <div>

            <div className="h-4 w-28 rounded bg-[#E7D5C5]" />

            <div className="mt-3 h-10 w-48 rounded bg-[#E7D5C5]" />

            <div className="mt-8 h-40 rounded-3xl bg-[#E7D5C5]" />

          </div>

        </GlassCard>

      </AppLayout>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <AppLayout>

      <GlassCard>

        {/* HEADER */}

        <div>

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C65D2E]">
            Preferences
          </p>

          <h1 className="mt-2 text-4xl font-black text-[#33251F]">
            Settings
          </h1>

          <p className="mt-3 max-w-2xl text-[#7A685D]">
            Manage your AshTray preferences and account.
          </p>

        </div>

        {/* GLOBAL MESSAGE */}

        {message && (
          <div className="mt-6 rounded-2xl border border-[#C65D2E]/10 bg-[#F1DFD0] px-5 py-4 text-sm font-semibold text-[#6F5C50]">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-[#C65D2E]/20 bg-[#F8EEE4] px-5 py-4 text-sm font-semibold text-[#B95025]">
            {error}
          </div>
        )}

        {/* SETTINGS */}

        <div className="mt-8 space-y-5">

          {/* ================================================= */}
          {/* DAILY LIMIT */}
          {/* ================================================= */}

          <div className="rounded-3xl border border-[#C65D2E]/10 bg-[#F1DFD0] p-6">

            <h2 className="text-xl font-black text-[#33251F]">
              Daily Limit
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7A685D]">
              Set the maximum number of cigarettes you want
              to allow yourself each day.
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">

              <div className="w-full sm:max-w-xs">

                <label
                  htmlFor="dailyLimit"
                  className="mb-2 block text-sm font-bold text-[#6F5C50]"
                >
                  Cigarettes per day
                </label>

                <input
                  id="dailyLimit"
                  type="number"
                  min="1"
                  max="100"
                  value={dailyLimit}
                  onChange={(event) => {
                    setDailyLimit(
                      event.target.value
                    );

                    setMessage("");
                    setError("");
                  }}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#C65D2E]/15
                    bg-[#FFF9F1]
                    px-4
                    py-3
                    text-lg
                    font-bold
                    text-[#33251F]
                    outline-none
                    transition
                    focus:border-[#C65D2E]
                    focus:ring-2
                    focus:ring-[#C65D2E]/10
                  "
                />

              </div>

              <button
                type="button"
                onClick={saveDailyLimit}
                disabled={saving}
                className="
                  rounded-2xl
                  bg-[#C65D2E]
                  px-6
                  py-3
                  font-bold
                  text-white
                  transition
                  hover:bg-[#B95025]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving
                  ? "Saving..."
                  : "Save Limit"}
              </button>

            </div>

          </div>

          {/* ================================================= */}
          {/* DAILY REMINDER */}
          {/* ================================================= */}

          <div className="rounded-3xl border border-[#C65D2E]/10 bg-[#F1DFD0] p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-xl font-black text-[#33251F]">
                  Daily Reminder
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#7A685D]">
                  Keep your daily reminder preference enabled
                  when you want AshTray to support your routine.
                </p>

              </div>

              <button
                type="button"
                onClick={toggleReminder}
                className={`
                  relative
                  h-8
                  w-14
                  shrink-0
                  rounded-full
                  transition
                  ${
                    reminderEnabled
                      ? "bg-[#C65D2E]"
                      : "bg-[#CDBCAF]"
                  }
                `}
                aria-label="Toggle daily reminder"
              >

                <span
                  className={`
                    absolute
                    top-1
                    h-6
                    w-6
                    rounded-full
                    bg-white
                    shadow-sm
                    transition
                    ${
                      reminderEnabled
                        ? "left-7"
                        : "left-1"
                    }
                  `}
                />

              </button>

            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#9A887A]">
              {reminderEnabled
                ? "Preference enabled"
                : "Preference disabled"}
            </p>

          </div>

          {/* ================================================= */}
          {/* ACCOUNT */}
          {/* ================================================= */}

          <div className="rounded-3xl border border-[#C65D2E]/10 bg-[#F1DFD0] p-6">

            <h2 className="text-xl font-black text-[#33251F]">
              Account
            </h2>

            <p className="mt-2 text-sm text-[#7A685D]">
              Your AshTray account.
            </p>

            <div className="mt-5 rounded-2xl bg-[#FFF9F1] px-5 py-4">

              <p className="text-xs font-bold uppercase tracking-wider text-[#9A887A]">
                Email
              </p>

              <p className="mt-1 break-all font-semibold text-[#33251F]">
                {email || "Account email unavailable"}
              </p>

            </div>

            <button
              type="button"
              onClick={signOut}
              className="
                mt-5
                rounded-2xl
                border
                border-[#C65D2E]/15
                bg-[#FFF9F1]
                px-6
                py-3
                font-bold
                text-[#6F5C50]
                transition
                hover:border-[#C65D2E]/25
                hover:bg-[#F8EEE4]
                hover:text-[#33251F]
              "
            >
              Sign Out
            </button>

          </div>

        </div>

      </GlassCard>

    </AppLayout>
  );
}