const SecondaryButton = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        rounded-2xl
        border
        border-[#C65D2E]/20
        bg-[#F1DFD0]
        px-6
        py-3
        font-semibold
        text-[#5F493D]
        transition-all
        duration-200
        hover:border-[#C65D2E]/40
        hover:bg-[#E8D3C2]
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;