const GlassCard = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-[28px]
        border border-[#C65D2E]/10
        bg-[#FFF9F1]
        p-6
        shadow-[0_8px_30px_rgba(91,62,45,0.06)]
        transition-all
        duration-300
        hover:border-[#C65D2E]/20
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;