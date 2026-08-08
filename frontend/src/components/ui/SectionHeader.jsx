export default function SectionHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <h2 className="text-3xl font-black text-[#33251F]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 max-w-2xl text-[#7A685D]">
            {subtitle}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}