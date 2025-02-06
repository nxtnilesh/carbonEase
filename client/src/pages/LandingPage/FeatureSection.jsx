import { AnimatedList } from "@/components/animated-list";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  UserPlus,
  MessageCircle,
  Leaf,
  ShieldCheck,
  MapPin,
  CreditCard,
} from "lucide-react";

const notifications = [
  {
    name: "Transparent Trading",
    description: "Powered by blockchain for fraud-free transactions.",
    icon: <ShieldCheck size={24} className="text-white" />,
    color: "#4CAF50",
  },
  {
    name: "Emission Calculator",
    description: "Estimate & offset your carbon footprint in minutes.",
    icon: <Leaf size={24} className="text-white" />,
    color: "#009688",
  },
  {
    name: "Certified Carbon Credits",
    description: "Verified listings from authentic providers.",
    icon: <DollarSign size={24} className="text-white" />,
    color: "#FFB300",
  },
  {
    name: "Gamification & Rewards",
    description: "Earn rewards for eco-friendly actions.",
    icon: <MessageCircle size={24} className="text-white" />,
    color: "#FF5722",
  },
  {
    name: "Geo-Mapping of Sellers",
    description: "Find renewable energy sources near you.",
    icon: <MapPin size={24} className="text-white" />,
    color: "#3F51B5",
  },
  {
    name: "Multiple Payment Options",
    description: "Pay via cards, crypto, or bank transfers.",
    icon: <CreditCard size={24} className="text-white" />,
    color: "#673AB7",
  },
];

const Notification = ({ name, description, icon, color }) => {
  return (
    <div className="width flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-all duration-200 hover:scale-105">
      <div
        className="flex items-center justify-center w-14 h-14 rounded-full"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-white text-center">
        {name}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
        {description}
      </p>
    </div>
  );
};

export function FeatureSection({ className }) {
  return (
    <section
      className={cn(
        "relative w-full py-12 px-6 md:px-16 bg-background",
        className
      )}
    >
      <h1 className="text-3xl md:text-4xl font-semibold text-center text-green-600">
        Why Choose CarbonEase?
      </h1>
      <p className="mt-3 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        Explore key features that make our platform the best choice for sustainable and transparent carbon credit trading.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </div>
    </section>
  );
}
