import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import {
  FiPlus,
  FiHeart,
  FiHome,
  FiSend,
  FiUsers,
  FiEdit,
  FiBarChart2,
} from "react-icons/fi";
import useUserRole from "../../hooks/useUserRole";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user: userEmail } = useAuth();
  const instance = useAxiosSecure();

  const { data: user } = useQuery({
    queryKey: ["user", userEmail],
    queryFn: async () => {
      const res = await instance.get(`/users/${userEmail.email}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  const { role } = useUserRole();

  const userNav = [
    { path: "/dashboard", icon: <FiHome />, label: "My Profile" },
    { path: "/dashboard/wishlist", icon: <FiHeart />, label: "Wishlist" },
    { path: "/dashboard/property-bought", icon: <FiSend />, label: "Bought" },
    { path: "/dashboard/my-reviews", icon: <FiEdit />, label: "My Reviews" },
  ];

  const agentNav = [
    { path: "/dashboard", icon: <FiHome />, label: "My Profile" },
    {
      path: "/dashboard/add-properties",
      icon: <FiPlus />,
      label: "Add Property",
      hidden: user?.fraud,
    },
    {
      path: "/dashboard/my-properties",
      icon: <FiHome />,
      label: "My Properties",
    },
    {
      path: "/dashboard/agent-paid-properties/:email",
      icon: <FiBarChart2 />,
      label: "Sold Summary",
    },
    {
      path: "/dashboard/my-requests",
      icon: <FiSend />,
      label: "Offers/Requests",
    },
  ];

  const adminNav = [
    { path: "/dashboard", icon: <FiHome />, label: "My Profile" },
    {
      path: "/dashboard/manage-users",
      icon: <FiUsers />,
      label: "Manage Users",
    },
    {
      path: "/dashboard/manage-property",
      icon: <FiHome />,
      label: "Manage Properties",
    },
    {
      path: "/dashboard/manage-reviews",
      icon: <FiEdit />,
      label: "Manage Reviews",
    },
    {
      path: "/dashboard/advertise",
      icon: <FiSend />,
      label: "Advertise Property",
    },
  ];

  const navItems =
    role === "admin"
      ? adminNav
      : role === "agent"
      ? agentNav.filter((item) => !item.hidden)
      : userNav;

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 left-5 z-[60] p-2 rounded-md bg-gray-900 text-orange-400 shadow-md hover:bg-gray-800 transition-all duration-300"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900/80 text-orange-400 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative shadow-xl border-r border-gray-800`}
      >
        <div className="flex flex-col h-full px-6 py-8">
          {/* Brand */}
          <div className="text-3xl font-bold mb-10 text-center tracking-tight select-none">
            <Link to="/">
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-md">
                Dashboard
              </span>
            </Link>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1">
            {navItems.map(({ path, icon, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${
                  isActive(path)
                    ? "bg-orange-500 text-gray-950 shadow-md"
                    : "hover:bg-orange-600 hover:text-white"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="my-6 border-t border-gray-800" />

          {/* Footer */}
          <div className="mt-auto text-xs text-center text-orange-300 tracking-wide">
            &copy; {new Date().getFullYear()} HavenKeys
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/10 bg-opacity-50 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
