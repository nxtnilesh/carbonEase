import AccordionSection from "./LandingPage/AccordionSection";
import {FactSection} from "./LandingPage/FactSection";
import {FeatureSection} from "./LandingPage/FeatureSection";
import { GlobeSection } from "./LandingPage/GlobeSection";
import StatsSection from "./LandingPage/StatsSection";const LandingPage = () => {
  return (
    <main className="w-screen relative">
      <GlobeSection />
      <FactSection />
      <StatsSection />
      <FeatureSection />
      <AccordionSection />

      {/* Floating Chatbot Button */}
      <a
        href="https://app.gpt-trainer.com/widget/1828a22e993f4369859c4bbcaf244279"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        Chat with us
      </a>
    </main>
  );
};

export default LandingPage;
