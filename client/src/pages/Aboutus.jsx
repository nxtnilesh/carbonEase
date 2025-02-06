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
    <div className="container mx-auto px-4 py-12 bg-green-50">
      <Card className="bg-white shadow-2xl p-10 border border-green-300 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-5xl font-extrabold text-green-800">
            About CarbonTrade Marketplace
          </CardTitle>
          <CardDescription className="text-lg text-gray-700 mt-4">
            Revolutionizing Carbon Credit Trading for a Sustainable Future
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="bg-green-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-green-800 mb-3">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              CarbonTrade Marketplace is a next-generation platform dedicated to
              streamlining carbon credit trading. We empower businesses, organizations,
              and individuals to engage in a transparent and efficient carbon market,
              accelerating the transition to a greener economy.
            </p>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md border border-green-200">
            <h2 className="text-3xl font-semibold text-green-800 mb-3">How We Work</h2>
            <p className="text-gray-700 leading-relaxed">
              Our platform facilitates seamless buying, selling, and trading of carbon credits.
              Businesses looking to offset their emissions can purchase verified credits,
              while sustainability project developers can monetize their efforts, ensuring
              real environmental impact.
            </p>
          </section>

          <section className="bg-green-200 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-green-900 mb-3">Key Features</h2>
            <ul className="list-disc pl-6 text-gray-800 space-y-2">
              <li>Secure and Transparent Transactions</li>
              <li>Verified Carbon Credit Listings</li>
              <li>Real-time Market Insights and Analytics</li>
              <li>Support for Both Compliance and Voluntary Markets</li>
              <li>Global Network of Buyers and Sellers</li>
            </ul>
          </section>

          <section className="bg-green-100 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-green-800 mb-3">Carbon Credit Trading: A Detailed Explanation</h2>
            <h3 className="text-2xl font-semibold text-green-700 mb-2">1. Introduction to Carbon Credit Trading</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Carbon credit trading is a market-based mechanism aimed at reducing global
              greenhouse gas (GHG) emissions. It allows companies, organizations, and even
              countries to buy and sell carbon credits, which represent the right to emit a
              certain amount of carbon dioxide (CO₂) or other GHGs.
            </p>
            <h3 className="text-2xl font-semibold text-green-700 mb-2">2. What Are Carbon Credits?</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              A carbon credit is a permit that allows the holder to emit one metric ton (1,000 kg)
              of CO₂ or an equivalent amount of another greenhouse gas.
            </p>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Compliance Market Credits – Used in government-regulated cap-and-trade programs.</li>
              <li>Voluntary Market Credits – Traded by companies and individuals looking to offset their emissions voluntarily.</li>
            </ul>
            <h3 className="text-2xl font-semibold text-green-700 mb-2">3. How Carbon Credit Trading Works</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The system works through cap-and-trade regulations or voluntary carbon markets:
            </p>
            <h4 className="text-xl font-semibold text-green-600">(a) Cap-and-Trade System</h4>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Governments set a cap on emissions.</li>
              <li>Companies that emit less than their allocated limit can sell excess carbon credits.</li>
              <li>Companies that exceed their emission limits must buy carbon credits to comply.</li>
            </ul>
            <h4 className="text-xl font-semibold text-green-600">(b) Voluntary Carbon Market</h4>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Companies and individuals can purchase credits to offset their carbon footprint.</li>
              <li>This promotes funding for renewable energy, reforestation, and carbon capture projects.</li>
            </ul>
            <h3 className="text-2xl font-semibold text-green-700 mb-2">4. Key Players in Carbon Credit Trading</h3>
            <ul className="list-disc pl-6 text-gray-800">
              <li>Governments & Regulators – Set emission limits and oversee compliance.</li>
              <li>Businesses & Industries – Buy/sell credits to meet sustainability goals.</li>
              <li>Carbon Credit Traders & Exchanges – Facilitate transactions.</li>
              <li>Project Developers – Create carbon reduction projects.</li>
            </ul>
          </section>

          <div className="text-center mt-8">
            <Button className="bg-green-700 hover:bg-green-900 text-white text-lg py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;