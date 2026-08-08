import {
  Wallet,
  ClipboardList,
  Cigarette,
  Flame,
} from "lucide-react";

import StatCard from "../ui/StatCard";

const StatsGrid = ({
  todayMoney,
  todayLogs,
  monthlyCigarettes,
  currentStreak = 0,
}) => {
  const stats = [
    {
      title: "Today's Spending",
      value: `₹${todayMoney}`,
      subtitle: "Every cigarette avoided helps you save money.",
      icon: <Wallet size={28} />,
    },
    {
      title: "Today's Activity",
      value: todayLogs,
      subtitle:
        "Understanding your habits is the first step toward change.",
      icon: <ClipboardList size={28} />,
    },
    {
      title: "This Month",
      value: monthlyCigarettes,
      subtitle:
        "Small reductions become lasting habits over time.",
      icon: <Cigarette size={28} />,
    },
    {
      title: "Current Streak",
      value: `${currentStreak} Days`,
      subtitle:
        "Consistency matters more than perfection.",
      icon: <Flame size={28} />,
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
        />
      ))}

    </div>
  );
};

export default StatsGrid;