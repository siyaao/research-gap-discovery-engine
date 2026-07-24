import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaHistory,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Upload",
      path: "/upload",
      icon: <FaUpload />,
    },
    {
      name: "History",
      path: "/history",
      icon: <FaHistory />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUserCircle />,
    },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold">
            AI
          </div>

          <div>
            <h1 className="text-lg font-bold">
              AI Research Gap Discovery Engine
            </h1>

            <p className="text-xs text-gray-500">
              Intelligent Research Analysis
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5">

          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}