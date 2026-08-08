import { Bell, UserCircle2, Flame } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-orange-500 flex items-center justify-center text-white">
          <Flame size={22} />
        </div>

        <div>
          <h1 className="text-xl font-bold text-gray-800">
            AshTray
          </h1>
          <p className="text-xs text-gray-500">
            Quit Smoking Tracker
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell
            className="text-gray-600 hover:text-orange-500 transition"
            size={22}
          />

          <span className="absolute -top-2 -right-2 bg-red-500 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white">
            2
          </span>
        </button>

        <div className="flex items-center gap-3 cursor-pointer">
          <UserCircle2
            size={40}
            className="text-orange-500"
          />

          <div>
            <h2 className="font-semibold text-gray-800">
              Rahul
            </h2>
            <p className="text-xs text-gray-500">
              Level 7
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;