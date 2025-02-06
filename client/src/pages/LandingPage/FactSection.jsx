import { Marquee } from "@/components/marquee";
import { cn } from "@/lib/utils";
import {
  FaLeaf,
  FaTemperatureHigh,
  FaRecycle,
  FaTree,
  FaGlobeAmericas,
} from "react-icons/fa"; // Adding icons

const reviews = [
  {
    name: "Global Carbon Impact",
    username: "@carbon_impact",
    body: "A staggering 36.3 billion metric tons of CO2 are emitted globally each year. We must act now to reduce this number!",
    img: <FaGlobeAmericas className="text-3xl text-red-500" />, // Globe icon with red color
    bgClass: "bg-red-100",
    textClass: "text-red-800",
  },
  {
    name: "Climate Crisis Alert",
    username: "@climate_alert",
    body: "The global average temperature has risen by 1.1°C since the pre-industrial era. This is a serious concern for future generations.",
    img: <FaTemperatureHigh className="text-3xl text-yellow-500" />, // Temperature icon with yellow color
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-800",
  },
  {
    name: "Renewable Energy Progress",
    username: "@renewable_energy",
    body: "29% of global electricity comes from renewable energy sources. We are making progress, but there's still a long way to go!",
    img: <FaRecycle className="text-3xl text-green-500" />, // Recycle icon with green color
    bgClass: "bg-green-100",
    textClass: "text-green-800",
  },
  {
    name: "Deforestation Crisis",
    username: "@forest_guardian",
    body: "4.7 million hectares of forest are lost each year. We need more initiatives to preserve our forests and biodiversity.",
    img: <FaTree className="text-3xl text-green-600" />, // Tree icon with green color
    bgClass: "bg-green-200",
    textClass: "text-green-900",
  },
  {
    name: "Eco-Friendly Marketplace",
    username: "@eco_marketplace",
    body: "125,000 credits have been traded on our eco-friendly platform, helping create a positive impact on the environment.",
    img: <FaLeaf className="text-3xl text-teal-500" />, // Leaf icon with teal color
    bgClass: "bg-teal-100",
    textClass: "text-teal-800",
  },
  {
    name: "Sustainable Projects",
    username: "@sustainable_projects",
    body: "230 projects focused on sustainability have been launched globally, providing innovative solutions to climate challenges.",
    img: <FaLeaf className="text-3xl text-teal-500" />, // Leaf icon with teal color
    bgClass: "bg-teal-100",
    textClass: "text-teal-800",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body, bgClass, textClass }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        bgClass
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex items-center justify-center rounded-full p-2 bg-white">
          {img}
        </div>
        <div className="flex flex-col">
          <figcaption className={`text-sm font-medium ${textClass}`}>
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-500 dark:text-white/40">
            {username}
          </p>
        </div>
      </div>
      <blockquote className={`mt-2 text-sm ${textClass}`}>{body}</blockquote>
    </figure>
  );
};

export function FactSection() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
  
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
