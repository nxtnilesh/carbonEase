import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { brandName } from "../../constant/global";
const Navbar = () => {
  const { user, logoutUser } = useAuth();

  return (
    <nav className="bg-white shadow-md p-2 px-5  flex justify-between items-center min-h-[10vh] ">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-gray-800">
        {brandName}
      </Link>
      {/* Navigation Links */}
      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/profile">
              <Button variant="outline" className="bg-brandMainColor">
                Profile
              </Button>
            </Link>
            <Button onClick={logoutUser} variant="destructive">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/seller">
              <Button variant="outline">Seller</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-brandMainColor">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
