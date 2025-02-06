import { Globe } from "@/components/globe";
import { Button } from "@/components/ui/button";

export function GlobeSection() {
  return (
    <section className="relative flex size-full items-center justify-center overflow-hidden rounded-lg border bg-background px-40 pb-40 pt-8 md:pb-60 md:shadow-xl min-h-[87vh]">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 max-w-5xl">
        Trade Carbon Credits & Renewable Energy Transparently with CarbonEase!
        <br />
        <span className="text-sm">
          "A marketplace to buy, sell, and offset carbon footprints seamlessly."
        </span>
      </span>
      <Globe className="top-36" />
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_50%_200%,rgba(0,0,0,0.2),rgba(255,255,255,0))]" />
      <div className=" bottom-12 flex gap-8">
        <Button className="bg-brandMainColor">Learn More</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </section>
  );
}
