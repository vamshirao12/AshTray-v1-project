const PrimaryButton = ({
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
        flex
        items-center
        justify-center
        rounded-2xl
        bg-[#C65D2E]
        px-6
        py-3
        font-semibold
        text-white
        transition-all
        duration-200
        hover:bg-[#B45127]
        hover:scale-[1.02]
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;