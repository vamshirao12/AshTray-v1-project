import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F6EDE3]">

      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl p-6 lg:p-10">
          {children}
        </div>
      </main>

    </div>
  );
}