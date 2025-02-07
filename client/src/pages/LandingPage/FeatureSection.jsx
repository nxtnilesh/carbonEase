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
    <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md transition-all duration-200 hover:scale-105 text-center">
      <div
        className="flex items-center justify-center w-16 h-16 rounded-full mb-4"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        {name}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
  );
};

export function FeatureSection({ className }) {
  return (
    <section
      className={cn(
        "relative w-full py-16 px-6 md:px-20 bg-background text-center",
        className
      )}
    >
      <h1 className="text-3xl md:text-4xl font-bold text-green-600">
        Why Choose CarbonEase?
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Explore key features that make our platform the best choice for sustainable and transparent carbon credit trading.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </div>
    </section>
  );
}
