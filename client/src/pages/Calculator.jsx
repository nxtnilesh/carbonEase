import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const emissionFactors = {
  electricity: 0.5, // kg CO2/kWh
  diesel: 2.68, // kg CO2/liter
  petrol: 2.31, // kg CO2/liter
  flight: 0.15, // kg CO2/passenger-km
  naturalGas: 2.03, // kg CO2/m3
  coal: 2.86, // kg CO2/kg
  bus: 0.1, // kg CO2/passenger-km
  train: 0.05, // kg CO2/passenger-km
};

const unitOptions = {
  electricity: ["kWh", "MWh"],
  diesel: ["liters", "gallons"],
  petrol: ["liters", "gallons"],
  flight: ["passenger-km", "miles"],
  naturalGas: ["m3", "cubic feet"],
  coal: ["kg", "tons"],
  bus: ["passenger-km", "miles"],
  train: ["passenger-km", "miles"],
};

const CarbonEmissionCalculator = () => {
  const [activities, setActivities] = useState(
    Object.keys(emissionFactors).map((type) => ({
      type,
      amount: 0,
      unit: unitOptions[type][0],
    }))
  );

  const [totalEmissions, setTotalEmissions] = useState(0);
  const [requiredCredits, setRequiredCredits] = useState(0);
  const [creditCost, setCreditCost] = useState(10);
  const [showResults, setShowResults] = useState(false);

  const handleActivityChange = (index, field, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = { ...updatedActivities[index], [field]: value };
    setActivities(updatedActivities);
  };

  const calculateEmissions = () => {
    const emissions = activities.reduce((total, activity) => {
      const amount = parseFloat(activity.amount) || 0;
      return total + amount * (emissionFactors[activity.type] || 0);
    }, 0);

    const totalEmissionsTons = emissions / 1000;
    setTotalEmissions(totalEmissionsTons);
    setRequiredCredits(Math.ceil(totalEmissionsTons));
    setShowResults(true);
  };

  return (
    <div className="container mx-auto my-8 p-8 max-w-5xl bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-10 text-center text-green-700">
        Carbon Emission Calculator
      </h1>

      <p className="text-center text-gray-600 mb-6">
        Calculate your carbon footprint based on energy consumption and travel habits.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <Card key={index} className="border border-green-300 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-green-800">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Usage
              </CardTitle>
              <CardDescription className="text-green-600">
                Enter the amount of {activity.type} consumed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor={`amount-${index}`} className="text-green-700">
                    Amount
                  </Label>
                  <Input
                    id={`amount-${index}`}
                    type="number"
                    className="border-green-500 focus:ring-green-600"
                    value={activity.amount}
                    onChange={(e) =>
                      handleActivityChange(index, "amount", parseFloat(e.target.value) || 0)
                    }
                    placeholder={`Enter ${activity.type} usage`}
                  />
                </div>
                <div>
                  <Label className="text-green-700">Unit</Label>
                  <Select
                    value={activity.unit}
                    onValueChange={(value) => handleActivityChange(index, "unit", value)}
                  >
                    <SelectTrigger className="border-green-500 focus:ring-green-600">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions[activity.type].map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border border-green-300 shadow-md p-4">
        <Label htmlFor="credit-cost" className="text-green-700">
          Cost per Carbon Credit (USD)
        </Label>
        <Input
          id="credit-cost"
          type="number"
          className="border-green-500 focus:ring-green-600 mt-2"
          value={creditCost}
          onChange={(e) => setCreditCost(parseFloat(e.target.value) || 0)}
          placeholder="Enter cost per credit"
        />
        <CardFooter>
          <Button
            onClick={calculateEmissions}
            className="w-full text-lg bg-green-600 hover:bg-green-700 text-white mt-4"
          >
            Calculate Emissions
          </Button>
        </CardFooter>
      </Card>

      {showResults && (
        <Card className="mt-8 bg-green-700 text-white shadow-lg p-4">
          <CardHeader>
            <CardTitle className="text-2xl">Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl mb-2">Total Emissions: {totalEmissions.toFixed(2)} tCO₂e</p>
            <p className="text-xl mb-2">Required Carbon Credits: {requiredCredits}</p>
            <p className="text-xl">Estimated Cost for Offsetting: ${(requiredCredits * creditCost).toFixed(2)}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarbonEmissionCalculator;
