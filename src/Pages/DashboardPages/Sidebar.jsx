import { useState } from "react";
import { Link, useLocation } from "react-router"; // useLocation to highlight active link
import { Menu, X } from "lucide-react";
import { FiPlusCircle, FiList, FiEdit } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/dashboard/add-properties", icon: <FiPlusCircle size={22} />, label: "Add Property" },
    { path: "/dashboard/my-properties", icon: <FiList size={22} />, label: "My Properties" },
    { path: "/dashboard/my-applications", icon: <FiEdit size={22} />, label: "My Applications" },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 left-5 z-[60] p-2 rounded-md bg-gray-900 text-orange-400 shadow-lg hover:bg-gray-800 transition"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-orange-400 shadow-xl z-50 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative`}
      >
        <div className="flex flex-col h-full p-8">
          {/* Title */}
          <h2 className="text-4xl font-extrabold mb-12 select-none">
            <span className="bg-gradient-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              HavenKeys
            </span>
          </h2>

          {/* Nav Items */}
          <nav className="flex flex-col gap-6">
            {navItems.map(({ path, icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-semibold transition
                    ${
                      isActive
                        ? "bg-orange-500 text-gray-900 shadow-lg"
                        : "hover:bg-orange-600 hover:text-white"
                    }`}
                >
                  <span className="flex-shrink-0">{icon}</span>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Footer or Additional Content */}
          <div className="mt-auto pt-6 text-sm text-orange-400">
            &copy; 2025 HavenKeys. All rights reserved.
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
