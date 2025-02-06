import {FactSection} from "./LandingPage/FactSection";
import {FeatureSection} from "./LandingPage/FeatureSection";
import { GlobeSection } from "./LandingPage/GlobeSection";
import StatsSection from "./LandingPage/StatsSection";

const LandingPage = () => {
  return (
    <main className="w-screen">
      <GlobeSection />
      <FactSection />
      <StatsSection />
      <FeatureSection />
    </main>
  );
};

export default LandingPage;
