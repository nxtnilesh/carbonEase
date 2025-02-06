import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import from react-router-dom
import { BarChart3, ListChecks, PlusCircle, ShoppingCart, DollarSign, MessageSquare, Settings } from "lucide-react";

// Define the navigation items
const navigation = [
  { name: "Dashboard Overview", href: "/overview", icon: BarChart3 },
  { name: "Manage Listings", href: "/dashboard/listings", icon: ListChecks },
  { name: "Create New Listing", href: "/form", icon: PlusCircle },
  { name: "Orders & Transactions", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Earnings & Payouts", href: "/dashboard/earnings", icon: DollarSign },
  { name: "Messages & Notifications", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Profile & Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation(); // React Router Hook to get current path

  return (
    <div className="flex w-64 flex-col bg-white">
      <div className="flex h-16 shrink-0 items-center border-b px-6">
        <span className="text-lg font-semibold">CarbonEase</span>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href; // Check if the route is active
          return (
            <Link
              key={item.name}
              to={item.href} // Use "to" instead of "href"
              className={`flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium ${
                isActive ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
