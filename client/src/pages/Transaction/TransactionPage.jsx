import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const TransactionPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({ cardNumber: "", expiry: "", cvv: "", upiId: "" });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    toast.success("Payment Successful!");
    console.log("Processing Payment: ", formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Complete Your Transaction</h1>
      <Card className="p-6 shadow-lg border rounded-lg">
        <CardContent>
          <Label className="text-lg font-medium mb-3 block">Select Payment Method</Label>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex gap-6 mb-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card">Credit / Debit Card</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi">UPI</Label>
            </div>
          </RadioGroup>

          {/* Card Payment Form */}
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <Label>Card Number</Label>
              <Input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" maxLength="16" onChange={handleInputChange} />

              <div className="flex gap-4">
                <div className="w-1/2">
                  <Label>Expiry Date</Label>
                  <Input type="text" name="expiry" placeholder="MM/YY" maxLength="5" onChange={handleInputChange} />
                </div>
                <div className="w-1/2">
                  <Label>CVV</Label>
                  <Input type="password" name="cvv" placeholder="123" maxLength="3" onChange={handleInputChange} />
                </div>
              </div>
            </div>
          )}

          {/* UPI Payment Form */}
          {paymentMethod === "upi" && (
            <div className="space-y-4">
              <Label>UPI ID</Label>
              <Input type="text" name="upiId" placeholder="yourname@upi" onChange={handleInputChange} />
            </div>
          )}

          <Button className="w-full mt-6 bg-green-500" onClick={handlePayment}>Proceed to Pay</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPage;
