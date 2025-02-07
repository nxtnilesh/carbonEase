import { Link, useLocation } from "react-router-dom"; // Import from react-router-dom
import {
  BarChart3,
  ListChecks,
  PlusCircle,
  ShoppingCart,
  DollarSign,
  MessageSquare,
} from "lucide-react";
import FormComponent from "@/pages/SellerPages/PopupForm";
import { useState } from "react";

// Define the navigation items
const navigation = [
  { name: "Dashboard Overview", href: "/seller-dashboard", icon: BarChart3 },
  { name: "Manage Listings", href: "/listings", icon: ListChecks },
  { name: "Orders & Transactions", href: "/transaction-listing", icon: ShoppingCart },
  // { name: "Earnings & Payouts", href: "/coming", icon: DollarSign },
  // { name: "Messages & Notifications", href: "/coming", icon: MessageSquare },
];

export function SellerSidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-64 flex-col bg-white">
      {/* Sidebar Header */}
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <span className="text-lg font-semibold">Seller</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}

        {/* Create New Listing Button Styled as NavLink */}
        <button
          className={`flex items-center gap-x-3 w-full text-left rounded-lg px-3 py-2 text-sm font-medium transition ${
            isOpen
              ? "bg-gray-100 text-gray-900"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <PlusCircle className="h-5 w-5" />
          Create New Listing
        </button>
      </nav>

      {/* FormComponent (Popup Form) */}
      <FormComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
