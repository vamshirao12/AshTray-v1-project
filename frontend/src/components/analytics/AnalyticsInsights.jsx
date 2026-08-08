import {
  Brain,
  Wallet,
  TrendingDown,
} from "lucide-react";

import GlassCard from "../ui/GlassCard";

const Card = ({
  icon,
  title,
  text,
}) => (
  <div className="rounded-[28px] bg-[#2A2523] border border-[#FB923C]/10 p-6">

    <div className="text-[#FB923C] mb-4">
      {icon}
    </div>

    <h3 className="text-xl font-bold text-white mb-3">
      {title}
    </h3>

    <p className="text-stone-400 leading-7">
      {text}
    </p>

  </div>
);

const AnalyticsInsights = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-8">

      <Card
        icon={<TrendingDown size={24} />}
        title="Positive Trend"
        text="You're gradually reducing your daily cigarette count. Small improvements like this build momentum over time."
      />

      <Card
        icon={<Wallet size={24} />}
        title="Savings"
        text="The money you don't spend today can support something meaningful to you in the future."
      />

      <Card
        icon={<Brain size={24} />}
        title="Reflection"
        text="Review your patterns each week to understand what situations make healthier choices easier or more challenging."
      />

    </div>
  );
};

export default AnalyticsInsights;