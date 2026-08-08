import {
  LayoutDashboard,
  Target,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Navigation = () => {

  const base =
    "flex items-center gap-3 px-5 py-3 rounded-2xl transition-all duration-300 font-medium";

  return (

    <div className="flex gap-4 mb-8">

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${base} ${
            isActive
              ? "bg-violet-600 text-white shadow-lg"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`
        }
      >
        <LayoutDashboard size={18}/>
        Dashboard
      </NavLink>

      <NavLink
        to="/challenges"
        className={({ isActive }) =>
          `${base} ${
            isActive
              ? "bg-violet-600 text-white shadow-lg"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`
        }
      >
        <Target size={18}/>
        Challenges
      </NavLink>

      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          `${base} ${
            isActive
              ? "bg-violet-600 text-white shadow-lg"
              : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800"
          }`
        }
      >
        <BarChart3 size={18}/>
        Analytics
      </NavLink>

    </div>

  );

};

export default Navigation;