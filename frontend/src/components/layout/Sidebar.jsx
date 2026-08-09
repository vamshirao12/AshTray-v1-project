import {
  LayoutDashboard,
  BarChart3,
  Trophy,
  HeartPulse,
  Award,
  Settings,
  LogOut,
  Code2,
  X,
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

const SidebarContent = ({ onNavigate }) => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex h-full flex-col">

      {/* Logo */}
      <div className="px-7 pt-8">
        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#C65D2E]/10
              text-[#C65D2E]
            "
          >
            <span className="text-2xl font-black">
              A
            </span>
          </div>

          <div className="min-w-0">

            <h1 className="text-2xl font-black text-[#33251F]">
              AshTray
            </h1>

            <p className="mt-1 text-xs leading-4 text-[#9A887A]">
              Healthier habits, one choice at a time.
            </p>

          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-9 flex-1 overflow-y-auto px-4">

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
                onClick={onNavigate}
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
                  className="shrink-0"
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
          type="button"
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

    </div>
  );
};

const Sidebar = ({
  mobileMenuOpen = false,
  setMobileMenuOpen = () => {},
}) => {
  return (
    <>
      {/* =========================================================
          DESKTOP SIDEBAR
          ========================================================= */}
      <aside
        className="
          fixed
          left-0
          top-0
          z-50
          hidden
          h-screen
          w-[270px]
          flex-col
          border-r
          border-[#C65D2E]/10
          bg-[#F1DFD0]
          lg:flex
        "
      >
        <SidebarContent />
      </aside>


      {/* =========================================================
          MOBILE OVERLAY
          ========================================================= */}
      {mobileMenuOpen && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            bg-[#33251F]/30
            backdrop-blur-[2px]
            lg:hidden
          "
          onClick={() => setMobileMenuOpen(false)}
        />
      )}


      {/* =========================================================
          MOBILE SIDEBAR
          ========================================================= */}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-[70]
          h-screen
          w-[min(85vw,320px)]
          border-r
          border-[#C65D2E]/10
          bg-[#F1DFD0]
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          lg:hidden
          ${
            mobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* Mobile Sidebar Header */}
        <div className="absolute right-4 top-4 z-10">

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation menu"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[#C65D2E]/10
              bg-[#FFF9F1]
              text-[#6F5C50]
            "
          >
            <X size={20} />
          </button>

        </div>

        <SidebarContent
          onNavigate={() => setMobileMenuOpen(false)}
        />

      </aside>
    </>
  );
};

export default Sidebar;