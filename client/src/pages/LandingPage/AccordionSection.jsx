import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is CarbonEase, and how does it help businesses?",
    answer:
      "CarbonEase is a digital platform that enables businesses to trade carbon credits, track emissions, and invest in sustainable energy projects. It provides data-driven insights to help organizations meet environmental compliance and sustainability goals.",
  },
  {
    question: "How does CarbonEase ensure transparency in carbon trading?",
    answer:
      "Our platform leverages blockchain-powered smart contracts to verify transactions, ensuring transparency, authenticity, and security in every carbon credit trade.",
  },
  {
    question: "Who can benefit from using CarbonEase?",
    answer:
      "Corporations, industries, sustainability consultants, and policymakers can use CarbonEase to measure, reduce, and offset carbon emissions while participating in the global carbon credit economy.",
  },
  {
    question: "How does CarbonEase calculate carbon emissions?",
    answer:
      "We use a scientifically validated Carbon Emission Calculator that accounts for energy consumption, logistics, operational activities, and supply chain emissions to generate precise carbon footprint assessments.",
  },
  {
    question: "What is the process for selling carbon credits on CarbonEase?",
    answer:
      "Businesses generating verified carbon credits from sustainability projects can list them on our marketplace. Buyers can then acquire these credits to offset their emissions, promoting a balanced and responsible carbon economy.",
  },
  {
    question: "What advantages does CarbonEase offer over traditional carbon markets?",
    answer:
      "CarbonEase simplifies carbon trading with a digital-first approach, offering real-time analytics, automated compliance tracking, and a global network of verified buyers and sellers.",
  },
  {
    question: "How can my organization start using CarbonEase?",
    answer:
      "Getting started is simple: create an account, complete your business profile, use our carbon calculator for an emissions audit, and begin trading carbon credits or investing in renewable energy projects.",
  },
];

export default function AccordionSection() {
  return (
    <div className="width mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg mb-8">
      <h2 className="text-3xl font-semibold text-center text-brandMainColor mb-6">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b">
            <AccordionTrigger className="text-lg font-medium text-gray-800 dark:text-gray-300 hover:text-brandMainColor">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 dark:text-gray-400">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
