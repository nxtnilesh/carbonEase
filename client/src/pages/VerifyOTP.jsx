import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/authService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.email) return <p>Error: No email provided</p>;

  const handleVerify = async () => {
    setLoading(true);
    try {
      await verifyOTP(state.email, otp);
      alert("OTP Verified! You can now login.");
      navigate("/login");
    } catch (error) {
      alert("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Verify OTP</h1>
      <Input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
      <Button onClick={handleVerify} loading={loading}>Verify</Button>
    </div>
  );
};

export default VerifyOTP;
