import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const emissionFactors = {
  electricity: 0.5, // kg CO2/kWh
  diesel: 2.68, // kg CO2/liter
  petrol: 2.31, // kg CO2/liter
  flight: 0.15, // kg CO2/passenger-km
}

const CarbonEmissionCalculator = () => {
  const [activities, setActivities] = useState([
    { type: "electricity", amount: 0, unit: "kWh" },
    { type: "diesel", amount: 0, unit: "liters" },
    { type: "petrol", amount: 0, unit: "liters" },
    { type: "flight", amount: 0, unit: "passenger-km" },
  ])

  const [totalEmissions, setTotalEmissions] = useState(0)
  const [requiredCredits, setRequiredCredits] = useState(0)
  const [creditCost, setCreditCost] = useState(10) // Default cost per credit

  const handleActivityChange = (index, field, value) => {
    const updatedActivities = [...activities]
    updatedActivities[index] = { ...updatedActivities[index], [field]: value }
    setActivities(updatedActivities)
  }

  const calculateEmissions = () => {
    const emissions = activities.reduce((total, activity) => {
      return total + activity.amount * emissionFactors[activity.type]
    }, 0)

    const totalEmissionsTons = emissions / 1000 // Convert kg to metric tons
    setTotalEmissions(totalEmissionsTons)
    setRequiredCredits(Math.ceil(totalEmissionsTons))
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-green-50 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-700">Carbon Emission Calculator</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {activities.map((activity, index) => (
          <Card key={index} className="mb-4 border border-green-300 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl text-green-800">
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} Usage
              </CardTitle>
              <CardDescription className="text-green-600">Enter the amount of {activity.type} consumed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`amount-${index}`} className="text-green-700">Amount</Label>
                  <Input
                    id={`amount-${index}`}
                    type="number"
                    className="border-green-500 focus:ring-green-600"
                    value={activity.amount}
                    onChange={(e) => handleActivityChange(index, "amount", Number.parseFloat(e.target.value))}
                    placeholder={`Enter ${activity.type} usage`}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-green-700">Unit</Label>
                  <Select value={activity.unit} onValueChange={(value) => handleActivityChange(index, "unit", value)}>
                    <SelectTrigger className="border-green-500 focus:ring-green-600">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={activity.unit}>{activity.unit}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8 border border-green-300 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-green-800">Carbon Credit Cost</CardTitle>
          <CardDescription className="text-green-600">Enter the cost per carbon credit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="credit-cost" className="text-green-700">Cost per Credit (USD)</Label>
            <Input
              id="credit-cost"
              type="number"
              className="border-green-500 focus:ring-green-600"
              value={creditCost}
              onChange={(e) => setCreditCost(Number.parseFloat(e.target.value))}
              placeholder="Enter cost per credit"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculateEmissions} className="w-full text-lg bg-green-600 hover:bg-green-700 text-white">
            Calculate Emissions
          </Button>
        </CardFooter>
      </Card>

      {totalEmissions > 0 && (
        <Card className="mt-8 bg-green-700 text-white shadow-lg">
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
  )
}

export default CarbonEmissionCalculator
