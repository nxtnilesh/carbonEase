import { Globe } from "@/components/globe";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";  // Import Link from react-router-dom

export function GlobeSection() {
  return (
    <section className="relative flex items-center justify-center min-h-[87vh] px-6 md:px-40 pb-16 md:pb-40 pt-8 md:pt-20 overflow-hidden rounded-lg border bg-background">
      {/* Title and description */}
      <div className="absolute text-center max-w-3xl z-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-semibold text-transparent bg-gradient-to-b from-black to-gray-400 bg-clip-text leading-tight sm:leading-snug">
          Trade Carbon Credits & Renewable Energy Transparently with CarbonEase!
        </h1>
        <p className="text-sm sm:text-base text-white dark:text-gray-200 mt-4 mx-auto max-w-xl">
          "A marketplace to buy, sell, and offset carbon footprints seamlessly."
        </p>
      </div>

      {/* Globe animation */}
      <Globe className="top-36 z-0 absolute w-full h-full object-cover" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.5),rgba(255,255,255,0))]" />

      {/* Buttons */}
      <div className="absolute bottom-12 flex gap-8 justify-center w-full px-6 sm:px-0">
        <Link to="/about"> {/* Link to "About Us" page */}
          <Button className="bg-brandMainColor px-8 py-3 text-lg rounded-lg">
            About Us
          </Button>
        </Link>
        <Link to="/calculator"> {/* Link to "Credits Calculator" page */}
          <Button variant="outline" className="px-8 py-3 text-lg rounded-lg">
            Credits Calculator
          </Button>
        </Link>
      </div>
    </section>
  );
}
