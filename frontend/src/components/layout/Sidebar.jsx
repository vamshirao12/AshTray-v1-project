import {
  LayoutDashboard,
  BarChart3,
  Trophy,
  HeartPulse,
  Award,
  Settings,
  LogOut,
  Code2,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Insights",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Challenges",
    path: "/challenges",
    icon: Trophy,
  },
  {
    name: "Craving Help",
    path: "/craving-help",
    icon: HeartPulse,
  },
  {
    name: "Healthy Wins",
    path: "/achievements",
    icon: Award,
  },
  {
    name: "The Builder",
    path: "/builder",
    icon: Code2,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <aside className="flex h-screen w-[270px] shrink-0 flex-col border-r border-[#C65D2E]/10 bg-[#F1DFD0]">

      {/* Logo */}
      <div className="px-7 pt-8">
        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#C65D2E]/10
              text-[#C65D2E]
            "
          >
            <span className="text-2xl">
              A
            </span>
          </div>

          <div>
            <h1 className="text-2xl font-black text-[#33251F]">
              AshTray
            </h1>

            <p className="mt-1 text-xs text-[#9A887A]">
              Healthier habits, one choice at a time.
            </p>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-9 flex-1 px-4">

        <p className="mb-3 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A887A]">
          Menu
        </p>

        <div className="space-y-1.5">

          {links.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-3.5
                  transition-all
                  duration-200

                  ${
                    isActive
                      ? "bg-[#C65D2E] text-white shadow-sm"
                      : "text-[#6F5C50] hover:bg-[#FFF9F1] hover:text-[#33251F]"
                  }
                `
                }
              >
                <Icon
                  size={19}
                  strokeWidth={2}
                />

                <span className="font-semibold">
                  {item.name}
                </span>

              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* Reminder */}
      <div className="mx-5 mb-5 rounded-3xl border border-[#C65D2E]/10 bg-[#FFF9F1] p-5">

        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#C65D2E]">
          Today's Reminder
        </p>

        <p className="mt-3 text-sm leading-6 text-[#6F5C50]">
          Progress isn't about being perfect. It's about making
          one healthier choice than yesterday.
        </p>

      </div>

      {/* Footer */}
      <div className="border-t border-[#C65D2E]/10 p-5">

        <button
          onClick={logout}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-[#C65D2E]/10
            bg-[#FFF9F1]
            py-3.5
            text-[#6F5C50]
            transition
            hover:border-[#C65D2E]/20
            hover:bg-[#F8EEE4]
            hover:text-[#33251F]
          "
        >
          <LogOut size={18} />

          <span className="font-semibold">
            Sign Out
          </span>
        </button>

        <p className="mt-4 text-center text-xs text-[#9A887A]">
          AshTray v1.0
        </p>

      </div>

    </aside>
  );
};

export default Sidebar;