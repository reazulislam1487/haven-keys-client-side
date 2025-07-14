import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";
import HavenKeysLogo from "./HevanKeysLogo";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const defaultAvatar = "https://www.w3schools.com/howto/img_avatar.png";
  // const [imgSrc, setImgSrc] = useState(user?.photoURL || defaultAvatar);

  // useEffect(() => {
  //   setImgSrc(user?.photoURL || defaultAvatar);
  // }, [user]);
  console.log(user);
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      confirmButtonColor: "#FF6F3C",
      cancelButtonColor: "#6B7280",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser().then(() => {
          Swal.fire({
            title: "Logged out!",
            text: "You have been logged out successfully.",
            icon: "success",
            confirmButtonColor: "#FF6F3C",
            timer: 1500,
          });
          navigate("/login");
        });
      }
    });
  };

  const navLinks = (
    <>
      {["/", "/properties", "/blog", "/about-us", "/contact-us"].map(
        (path, index) => {
          const labels = ["Home", "Properties", "Blog", "About", "Contact"];
          return (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                    : "hover:text-orange-400 transition"
                }
              >
                {labels[index]}
              </NavLink>
            </li>
          );
        }
      )}
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                : "hover:text-orange-400 transition"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <nav className="navbar max-w-7xl mx-auto px-4 md:px-6 py-4">
        {/* Left Side */}
        <div className="navbar-start flex items-center gap-4">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost text-white p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-gray-800 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>

          <div className="hidden lg:flex items-center">
            {/* <HavenKeysLogo width={150} height={50} /> */}

            <div className="w-12 h-12 flex items-center justify-center mr-2 ">
              <img src="/logo.png" className="rounded-full" alt="" />
            </div>
            <NavLink
              to="/"
              className="text-2xl font-extrabold text-orange-500 select-none"
            >
              <span className="text-orange-500">HavenKeys </span>
            </NavLink>
          </div>
        </div>

        {/* Center Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-6">{navLinks}</ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end flex items-center gap-3">
          {user ? (
            <>
              <div className="relative group inline-block">
                <img
                  src={user?.photoURL || defaultAvatar}
                  alt="User"
                  referrerPolicy="no-referrer"
                  // onError={() => setImgSrc(defaultAvatar)}
                  className="w-10 h-10 rounded-full ring-2 ring-orange-500 object-cover"
                />
                <span className="absolute bg-black bg-opacity-80 text-white text-sm rounded px-3 py-1 top-1/2 right-full -translate-y-1/2 mr-2 opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap z-50">
                  {user?.displayName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
