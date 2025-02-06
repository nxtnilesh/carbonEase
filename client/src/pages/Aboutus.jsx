// import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="bg-background shadow-lg p-8">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-green-700">
            About CarbonTrade Marketplace
          </CardTitle>
          <CardDescription className="text-center text-lg text-gray-600 mt-2">
            Revolutionizing Carbon Credit Trading for a Sustainable Future
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700">
              CarbonTrade Marketplace is a next-generation platform dedicated to 
              streamlining carbon credit trading. We empower businesses, organizations, 
              and individuals to engage in a transparent and efficient carbon market, 
              accelerating the transition to a greener economy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              How We Work
            </h2>
            <p className="text-gray-700">
              Our platform facilitates seamless buying, selling, and trading of carbon credits. 
              Businesses looking to offset their emissions can purchase verified credits, 
              while sustainability project developers can monetize their efforts, ensuring 
              real environmental impact.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Key Features
            </h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Secure and Transparent Transactions</li>
              <li>Verified Carbon Credit Listings</li>
              <li>Real-time Market Insights and Analytics</li>
              <li>Support for Both Compliance and Voluntary Markets</li>
              <li>Global Network of Buyers and Sellers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Why Choose CarbonTrade Marketplace?
            </h2>
            <p className="text-gray-700">
              Our marketplace is designed to drive impactful environmental action while ensuring 
              accessibility and efficiency. With cutting-edge technology, we provide a trustworthy 
              and user-friendly platform for sustainable trading.
            </p>
          </section>

          {/* New section for Carbon Credit Trading: A Detailed Explanation */}
          <section>
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Carbon Credit Trading: A Detailed Explanation
            </h2>
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              1. Introduction to Carbon Credit Trading
            </h3>
            <p className="text-gray-700 mb-4">
              Carbon credit trading is a market-based mechanism aimed at reducing global greenhouse gas (GHG) emissions. It allows companies, organizations, and even countries to buy and sell carbon credits, which represent the right to emit a certain amount of carbon dioxide (CO₂) or other GHGs. This system incentivizes businesses to lower their emissions while enabling those who exceed their limits to compensate by purchasing credits from those with surplus reductions.
            </p>

            <h3 className="text-xl font-semibold text-green-700 mb-2">
              2. What Are Carbon Credits?
            </h3>
            <p className="text-gray-700 mb-4">
              A carbon credit is a permit that allows the holder to emit one metric ton (1,000 kg) of CO₂ or an equivalent amount of another greenhouse gas.
            </p>
            <h4 className="text-lg font-semibold text-green-700 mb-2">
              Types of Carbon Credits
            </h4>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Compliance Market Credits – Used in government-regulated cap-and-trade programs.</li>
              <li>Voluntary Market Credits – Traded by companies and individuals looking to offset their emissions voluntarily.</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-700 mb-2">
              3. How Carbon Credit Trading Works
            </h3>
            <p className="text-gray-700 mb-4">
              The system works through cap-and-trade regulations or voluntary carbon markets:
            </p>
            <h4 className="text-lg font-semibold text-green-700 mb-2">
              (a) Cap-and-Trade System
            </h4>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Governments or regulatory bodies set a cap (limit) on emissions.</li>
              <li>Companies that emit less than their allocated limit can sell excess carbon credits.</li>
              <li>Companies that exceed their emission limits must buy carbon credits to comply.</li>
            </ul>
            <h4 className="text-lg font-semibold text-green-700 mb-2">
              (b) Voluntary Carbon Market
            </h4>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Companies and individuals can purchase credits to offset their carbon footprint.</li>
              <li>This promotes funding for renewable energy, reforestation, and carbon capture projects.</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-700 mb-2">
              4. Key Players in Carbon Credit Trading
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Governments & Regulators – Set emission limits and oversee compliance.</li>
              <li>Businesses & Industries – Buy/sell credits to meet sustainability goals.</li>
              <li>Carbon Credit Traders & Exchanges – Facilitate transactions (e.g., EU ETS, Chicago Climate Exchange).</li>
              <li>Project Developers – Create carbon reduction projects (e.g., wind farms, afforestation).</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-700 mb-2">
              5. Benefits of Carbon Credit Trading
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Reduces Global Emissions – Encourages industries to adopt cleaner technologies.</li>
              <li>Economic Incentives – Companies can profit by reducing emissions efficiently.</li>
              <li>Encourages Sustainability – Funds renewable energy and environmental projects.</li>
              <li>Promotes Innovation – Drives investment in green technologies.</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-700 mb-2">
              6. Challenges & Criticisms
            </h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Carbon Leakage – Some companies relocate to countries with weaker regulations.</li>
              <li>Market Manipulation – Speculators may exploit credit pricing.</li>
              <li>Greenwashing – Some companies buy credits without real efforts to cut emissions.</li>
              <li>Monitoring Issues – Difficulty in verifying emission reductions in some projects.</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Conclusion
            </h3>
            <p className="text-gray-700 mb-4">
              Carbon credit trading is a crucial tool in the fight against climate change, helping reduce emissions while supporting sustainable development. However, it must be carefully regulated to prevent misuse and ensure real environmental benefits.
            </p>
          </section>

          <div className="text-center mt-8">
            <Button className="bg-green-700 hover:bg-green-800 text-white">
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
