import GlassCard from "./GlassCard";

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
}) => {
  return (
    <GlassCard>
      <div className="text-[#C65D2E]">
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-medium text-[#7A685D]">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold text-[#33251F]">
        {value}
      </p>

      <p className="mt-2 text-sm text-[#9A887A]">
        {subtitle}
      </p>
    </GlassCard>
  );
};

export default StatCard;