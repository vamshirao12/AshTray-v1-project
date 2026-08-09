import { useState } from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6EDE3]">

      {/* Desktop Sidebar */}
      <Sidebar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Application Area */}
      <main className="min-h-screen min-w-0 lg:ml-[270px]">

        {/* Mobile Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-[#C65D2E]/10 bg-[#F6EDE3]/95 px-4 backdrop-blur lg:hidden">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C65D2E]/10 text-[#C65D2E]">
              <span className="text-lg font-black">
                A
              </span>
            </div>

            <div>
              <p className="text-base font-black leading-none text-[#33251F]">
                AshTray
              </p>

              <p className="mt-1 text-[10px] text-[#9A887A]">
                Healthier habits
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C65D2E]/10 bg-[#FFF9F1] text-[#6F5C50] transition hover:bg-white"
          >
            <Menu size={21} />
          </button>

        </header>

        {/* Page Content */}
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:p-10">
          {children}
        </div>

      </main>

    </div>
  );
}