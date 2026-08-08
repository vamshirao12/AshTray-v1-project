import GlassCard from "../ui/GlassCard";

const milestones = [
  {
    time: "20 Minutes",
    title: "Heart Rate",
    description:
      "Heart rate and blood pressure begin returning toward normal.",
  },
  {
    time: "12 Hours",
    title: "Carbon Monoxide",
    description:
      "Carbon monoxide levels decrease as your body continues to recover.",
  },
  {
    time: "2 Weeks",
    title: "Circulation",
    description:
      "Circulation can begin improving with continued progress.",
  },
  {
    time: "3 Months",
    title: "Breathing",
    description:
      "Many people notice breathing and energy levels gradually improving.",
  },
  {
    time: "1 Year",
    title: "Long-Term Health",
    description:
      "Continuing to stay smoke-free brings meaningful long-term health benefits.",
  },
];

const HealthTimeline = () => {
  return (
    <GlassCard className="mt-8">

      <h2 className="text-2xl font-bold text-white mb-8">
        Health Journey
      </h2>

      <div className="space-y-8">

        {milestones.map((item) => (

          <div
            key={item.time}
            className="flex gap-6"
          >

            <div className="w-28 text-[#FB923C] font-bold">
              {item.time}
            </div>

            <div className="flex-1 border-l border-[#FB923C]/20 pl-6">

              <h3 className="text-white font-semibold text-lg">
                {item.title}
              </h3>

              <p className="text-stone-400 mt-2 leading-7">
                {item.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </GlassCard>
  );
};

export default HealthTimeline;