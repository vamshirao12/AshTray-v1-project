import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import GlassCard from "../ui/GlassCard";

const data = [
  { day: "Mon", cigarettes: 8 },
  { day: "Tue", cigarettes: 7 },
  { day: "Wed", cigarettes: 6 },
  { day: "Thu", cigarettes: 6 },
  { day: "Fri", cigarettes: 5 },
  { day: "Sat", cigarettes: 5 },
  { day: "Sun", cigarettes: 4 },
];

const AnalyticsChart = () => {
  return (
    <GlassCard className="mt-8">

      <h2 className="text-2xl font-bold text-white mb-6">
        Weekly Trend
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={data}>

            <CartesianGrid
              stroke="#3A332F"
              strokeDasharray="3 3"
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
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </GlassCard>
  );
};

export default AnalyticsChart;