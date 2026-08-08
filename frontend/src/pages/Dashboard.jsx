import { useEffect, useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import Header from "../components/layout/Header";
import DashboardHero from "../components/dashboard/DashboardHero";
import EntriesCard from "../components/dashboard/EntriesCard";
import AddEntryModal from "../components/AddEntryModal";

import api from "../services/api";

import {
  getTodayLogs,
  getTodayMoney,
  getTodayCigarettes,
} from "../utils/analytics";

export default function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(10);

  const fetchEntries = async () => {
    try {
      const response = await api.get("/entries");

      setEntries(response.data.entries || []);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/me");

      setDailyLimit(
        Number(response.data.user.dailyGoal) || 10
      );
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await api.delete(`/entries/${id}`);

      await fetchEntries();
    } catch (error) {
      console.error("Failed to delete activity:", error);

      alert("Failed to delete activity.");
    }
  };

  useEffect(() => {
    fetchEntries();
    fetchProfile();
  }, []);

  const today = new Date();

  const todayEntries = entries.filter((entry) => {
    if (!entry.date && !entry.createdAt) {
      return false;
    }

    const entryDate = new Date(
      entry.date || entry.createdAt
    );

    return (
      entryDate.toDateString() ===
      today.toDateString()
    );
  });

  const todayLogs = getTodayLogs(entries);

  const todayMoney = getTodayMoney(entries);

  const todayCigarettes =
    getTodayCigarettes(entries);

  return (
    <AppLayout>

      <Header
        action={{
          onClick: () => setShowModal(true),
        }}
        showIntention
      />

      <main className="mx-auto w-full max-w-7xl">

        <DashboardHero
          todayLogs={todayLogs}
          todayCigarettes={todayCigarettes}
          todayMoney={todayMoney}
          dailyLimit={dailyLimit}
        />

        <div className="mt-8">

          <EntriesCard
            entries={todayEntries}
            onAddEntry={() => setShowModal(true)}
            onDelete={deleteEntry}
          />

        </div>

      </main>

      {showModal && (
        <AddEntryModal
          onClose={() => setShowModal(false)}
          onEntryAdded={fetchEntries}
        />
      )}

    </AppLayout>
  );
}