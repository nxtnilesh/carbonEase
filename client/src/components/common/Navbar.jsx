import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import logo from "../../../public/logo.png";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="bg-gray-50 shadow-md p-2 px-5 flex justify-between items-center min-h-[10vh]">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-gray-800">
        <img src={logo} alt="logo" width={180} />
      </Link>

      {/* Centered Navigation Links */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
        <Link
          to="/about"
          className="text-gray-800 font-medium hover:text-brandMainColor"
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="text-gray-800 font-medium hover:text-brandMainColor"
        >
          Contact Us
        </Link>
        <Link
          to="/calculator"
          className="text-gray-800 font-medium hover:text-brandMainColor"
        >
          Emission Calculator
        </Link>
      </div>

      {/* User Links */}
      <div className="flex gap-4">
        {user ? (
          <>
            <Button
              onClick={logoutUser}
              className="bg-red-500 text-white px-4 py-2"
            >
              Logout
              <LogOut />
            </Button>
          </>
        ) : (
          <>
            {user ?? (
              <>
                <Link to="/login">
                  <Button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-brandMainColor text-white px-4 py-2 hover:bg-green-600 transition">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
