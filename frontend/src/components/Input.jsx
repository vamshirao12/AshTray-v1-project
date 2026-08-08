export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 focus:outline-none mt-4"
    />
  );
}