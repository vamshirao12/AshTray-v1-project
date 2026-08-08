import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import GlassCard from "../ui/GlassCard";

const WeeklyTrendCard = ({ data }) => {

  const total = data.reduce(
    (sum, day) => sum + day.cigarettes,
    0
  );

  const average = (total / 7).toFixed(1);

  return (
    <GlassCard className="mt-8">

      <div className="mb-8">

        <p className="uppercase tracking-[0.3em] text-xs text-[#FB923C] font-semibold">
          Weekly Trend
        </p>

        <h2 className="text-3xl font-black text-white mt-2">
          Your Last 7 Days
        </h2>

        <p className="text-[#A8A29E] mt-3">
          Your smoking activity over the past week.
        </p>

      </div>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              stroke="#3B3533"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="day"
              stroke="#A8A29E"
            />

            <YAxis
              stroke="#A8A29E"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="cigarettes"
              stroke="#FB923C"
              strokeWidth={4}
              dot={{ r: 5 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      <div className="mt-6 rounded-3xl bg-[#FB923C]/10 p-6">

        <p className="text-[#FB923C] font-semibold">
          Weekly Summary
        </p>

        <p className="text-[#D6D3D1] mt-3">
          Total this week: <b>{total}</b> cigarettes
          <br />
          Daily average: <b>{average}</b> cigarettes
        </p>

      </div>

    </GlassCard>
  );
};

export default WeeklyTrendCard;