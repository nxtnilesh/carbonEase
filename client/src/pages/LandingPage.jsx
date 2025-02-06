import {FeatureSection} from "./LandingPage/FeatureSection";
import {  GlobeSection } from "./LandingPage/GlobeSection";
import StatsSection from "./LandingPage/StatsSection";

const LandingPage = () => {
  return (
    <main className="w-screen">
      <GlobeSection />
      <StatsSection/>
      <FeatureSection/>
    </main>
  );
};

export default LandingPage;
