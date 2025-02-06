import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2000", emissions: 24.0 },
  { year: "2005", emissions: 29.3 },
  { year: "2010", emissions: 33.5 },
  { year: "2015", emissions: 35.9 },
  { year: "2018", emissions: 36.6 },
  { year: "2019", emissions: 36.7 },
  { year: "2020", emissions: 34.7 },
  { year: "2021", emissions: 36.3 },
  { year: "2022", emissions: 37.1 },
  { year: "2023", emissions: 37.0 },
];

const StatsSection = () => {
  return (
    <section className="w-full flex flex-col lg:flex-row items-center justify-between py-10 px-6 gap-10">
      {/* Left: Graph Section */}
      <div className="w-full lg:w-2/3 h-[350px] flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">
          Global CO₂ Emissions (2000 - 2023)
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 40, left: 60, bottom: 10 }} // Adjusted margins for spacing
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis
              label={{
                value: "Billion Metric Tons",
                angle: -90,
                position: "outsideLeft",
                dx: -15, // Moves label further left
                fontSize: 14,
              }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => `${value} Billion Metric Tons`}
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="emissions"
              stroke="#5CB338"
              strokeWidth={3}
              dot={{ r: 4, fill: "#4A8E2B" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Right: About Section */}
      <div className="w-full lg:w-1/3 bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-semibold text-gray-800">About the Graph</h3>
        <p className="text-gray-600 mt-3">
          This graph represents <b>global CO₂ emissions</b> from <b>2000 to 2023</b> in <b>billion metric tons</b>.
          Tracking emissions is crucial for understanding climate change trends.
        </p>

        <ul className="mt-4 space-y-2 text-gray-600 text-sm">
          <li>✅ Emissions increased significantly from <b>2000 (24.0)</b> to <b>2019 (36.7)</b></li>
          <li>✅ A slight dip occurred in <b>2020 (34.7)</b>, likely due to global lockdowns.</li>
          <li>✅ Emissions are rising again, reaching <b>37.0 billion metric tons in 2023</b>.</li>
        </ul>

        <h4 className="text-lg font-semibold text-gray-800 mt-5">
          Why This Data Matters
        </h4>
        <p className="text-gray-600 mt-2">
          In a <b>carbon credit trading platform</b>, understanding CO₂ trends helps businesses and individuals:
        </p>
        <ul className="mt-3 space-y-1 text-gray-600 text-sm">
          <li>📌 Buy or sell <strong>carbon credits</strong> to offset emissions.</li>
          <li>📌 Measure the impact of <b>emission reduction strategies</b>.</li>
          <li>📌 Make informed decisions on <b>climate-conscious investments</b>.</li>
        </ul>
      </div>
    </section>
  );
};

export default StatsSection;
