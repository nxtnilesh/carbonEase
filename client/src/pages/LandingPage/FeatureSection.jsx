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
    // time: "Just now",
    icon: <ShieldCheck size={20} />,
    color: "#4CAF50",
  },
  {
    name: "Emission Calculator",
    description: "Estimate & offset your carbon footprint in minutes.",
    // time: "5m ago",
    icon: <Leaf size={20} />,
    color: "#009688",
  },
  {
    name: "Certified Carbon Credits",
    description: "Verified listings from authentic providers.",
    // time: "10m ago",
    icon: <DollarSign size={20} />,
    color: "#FFB300",
  },
  {
    name: "Gamification & Rewards",
    description: "Earn rewards for eco-friendly actions.",
    // time: "20m ago",
    icon: <MessageCircle size={20} />,
    color: "#FF5722",
  },
  {
    name: "Geo-Mapping of Sellers",
    description: "Find renewable energy sources near you.",
    // time: "30m ago",
    icon: <MapPin size={20} />,
    color: "#3F51B5",
  },
  {
    name: "Multiple Payment Options",
    description: "Pay via cards, crypto, or bank transfers.",
    // time: "45m ago",
    icon: <CreditCard size={20} />,
    color: "#673AB7",
  },
];

const Notification = ({ name, description, icon, color, time }) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white shadow-md dark:bg-gray-800 dark:text-white"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export function FeatureSection({ className }) {
  return (
    <div
      className={cn(
        "relative flex h-auto w-full flex-col overflow-hidden rounded-lg border bg-background p-6 md:shadow-xl",
        className
      )}
    >
      <h1 className="text-center p-4 title">Key Features Section (Why Choose CarbonEase?) </h1>
      <AnimatedList>
        {notifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
