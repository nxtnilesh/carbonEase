import { Globe } from "@/components/globe";
import { GridPattern } from "@/components/grid-pattern";
import { PulsatingButton } from "@/components/pulsating-button";
import { ShimmerButton } from "@/components/shimmer-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { cn } from "@/lib/utils";
import { ArrowRight, DollarSign, ShoppingCart } from "lucide-react";
export function GlobeSection() {
  return (
    <section className="relative flex justify-center min-h-[90vh] px-6 md:px-40 md:pb-40 overflow-hidden ">
      {/* Title and description */}
      <div className=" text-center max-w-3xl z-10 px-4">
        <h1 className="text-3xl sm:text-5xl font-semibold text-transparent bg-gradient-to-b from-black to-gray-400 bg-clip-text leading-tight sm:leading-tight mt-8 ">
          Trade Carbon Credits & Renewable Energy Transparently with
          <span className="text-brandMainColor"> CarbonEase!</span>
        </h1>
      </div>

      {/* Globe animation */}
      <Globe className="top-36 z-0 absolute w-full h-full object-cover" />
      {/* Buttons */}
      <div className="absolute bottom-12 flex gap-8 justify-center w-full px-6 sm:px-0">
        <Link to="/buyer">
          {/* Link to "About Us" page */}
          <PulsatingButton className="shadow-2xl bg-white">
            <span className="flex items-center gap-2 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-brandMainColor lg:text-lg">
              {/* Arrow icon */}
              <ShoppingCart className="w-5 h-5 text-brandMainColor" />{" "}
              {/* Shopping cart icon */}
              Buy Carbon Credits
              <ArrowRight className="w-5 h-5 text-brandMainColor" />{" "}
            </span>
          </PulsatingButton>
        </Link>
        <Link to="/seller">
          {/* Link to "Credits Calculator" page */}
          <button className="flex items-center justify-center gap-2 whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-brandMainColor lg:text-lg border-2 border-brandMainColor px-4 py-2 rounded-md bg-white hover:bg-green-100 transition-all duration-200">
            <DollarSign className="w-5 h-5 text-brandMainColor" />{" "}
            {/* Dollar icon */}
            Sell your Credits
            <ArrowRight className="w-5 h-5 text-brandMainColor" />{" "}
            {/* Arrow icon */}
          </button>
        </Link>
      </div>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 -z-10"
        )}
      />
    </section>
  );
}
