import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast, Toaster } from "sonner";
import { CreditCard, IndianRupee, ShieldCheck } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const TransactionPage = () => {
  const { token } = useAuth();
  const [id] = useSearchParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    try {
      const payload = {
        amount: 20,
        quantity: 2,
        sellerName: token,
      };

      const response = await axios.post(
        "http://localhost:3000/api/credits/payment",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(
          <div className="flex items-center gap-3">
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeXBlNzgxMjd1ZWN3bGI0MHM0NTJneTd2NzE2cXpvY2pwNms1aGEweCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/s14jtoFmzJM3n4uyfi/giphy.gif"
              alt="Success"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold text-lg">Payment Successful!</p>
              <p className="text-sm text-gray-500">
                Your transaction has been completed.
              </p>
            </div>
          </div>,
          { duration: 4000 }
        );
        setTimeout(() => {
          navigate("/buyer");
        }, 2000);
      } else {
        throw new Error("Payment failed. Please try again.");
      }
    } catch (error) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <Toaster position="top-center" richColors />
      <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
        <ShieldCheck className="w-6 h-6 text-green-500" /> Secure Payment
      </h1>

      <Card className="p-6 shadow-lg border rounded-xl">
        <CardContent>
          <Label className="text-lg font-medium mb-4 block">
            Select Payment Method
          </Label>
          <RadioGroup
            value={paymentMethod}
            onValueChange={setPaymentMethod}
            className="flex gap-6 mb-6"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-500" /> Card
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-gray-500" /> UPI
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <Label>Card Number</Label>
              <Input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                maxLength="16"
                onChange={handleInputChange}
              />
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Label>Expiry Date</Label>
                  <Input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    maxLength="5"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/2">
                  <Label>CVV</Label>
                  <Input
                    type="password"
                    name="cvv"
                    placeholder="***"
                    maxLength="3"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "upi" && (
            <div className="space-y-4">
              <Label>UPI ID</Label>
              <Input
                type="text"
                name="upiId"
                placeholder="yourname@upi"
                onChange={handleInputChange}
              />
            </div>
          )}

          <Button
            className="w-full mt-6 bg-green-500 hover:bg-green-600"
            onClick={handlePayment}
          >
            Proceed to Pay
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionPage;
