import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-gradient-to-br from-purple-800/90 to-slate-900/60 backdrop:blur-lg text-white p-4">
      <div className="text-lg font-semibold mb-6">Dashboard</div>
      <nav className="space-y-4">
        <Link
          href="/profile"
          className="block py-2 px-4 rounded hover:bg-neutral-400/30"
        >
          Profile
        </Link>
        <Link
          href="/settings"
          className="block py-2 px-4 hover:bg-neutral-400/30"
        >
          Settings
        </Link>
        <Link href="/" className="block py-2 px-4 hover:bg-neutral-400/30">
          Dashboard
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
