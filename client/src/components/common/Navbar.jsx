import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import logo from "../../../public/logo.png";
import { LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <nav className="bg-gray-50 shadow-md p-4 flex justify-between items-center min-h-[10vh]">
      {/* Logo */}
      <Link to="/" className="text-xl font-bold text-gray-800">
        <img src={logo} alt="logo" width={160} />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-6">
        <Link to="/about" className="text-gray-800 font-medium hover:text-brandMainColor">
          About Us
        </Link>
        <Link to="/contact" className="text-gray-800 font-medium hover:text-brandMainColor">
          Contact Us
        </Link>
        <Link to="/calculator" className="text-gray-800 font-medium hover:text-brandMainColor">
          Emission Calculator
        </Link>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="md:hidden">
          <Menu size={28} />
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col gap-4 p-6">
          <Link to="/" onClick={closeSheet} className="text-xl font-bold text-gray-800">
            <img src={logo} alt="logo" width={140} />
          </Link>
          <Link to="/about" onClick={closeSheet} className="text-gray-800 font-medium hover:text-brandMainColor">
            About Us
          </Link>
          <Link to="/contact" onClick={closeSheet} className="text-gray-800 font-medium hover:text-brandMainColor">
            Contact Us
          </Link>
          <Link to="/calculator" onClick={closeSheet} className="text-gray-800 font-medium hover:text-brandMainColor">
            Emission Calculator
          </Link>
          <div className="mt-4">
            {user ? (
              <Button onClick={() => { logoutUser(); closeSheet(); }} className="bg-red-500 text-white px-4 py-2 w-full">
                Logout <LogOut size={16} className="ml-2" />
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={closeSheet}>
                  <Button className="bg-gray-200 text-gray-800 w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={closeSheet}>
                  <Button className="bg-brandMainColor text-white w-full mt-2">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* User Section (Desktop) */}
      <div className="hidden md:flex gap-4">
        {user ? (
          <Button onClick={logoutUser} className="bg-red-500 text-white px-4 py-2">
            Logout <LogOut size={16} className="ml-2" />
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button className="bg-gray-200 text-gray-800 px-4 py-2">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-brandMainColor text-white px-4 py-2">Sign Up</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
