import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!agreed) {
      toast({
        title: "Terms & Conditions",
        description: "You must agree to the terms and conditions before registering.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError("");

    try {
      await registerUser(email, password);
      toast({
        title: "OTP Sent",
        description: "An OTP has been sent to your email. Please verify your account.",
        variant: "default",
      });
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg my-8">
      <h1 className="text-2xl font-bold text-center text-brandMainColor mb-2">
        Create an Account
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
        Join us and explore exclusive features!
      </p>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {/* Email Input */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="pl-10"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="pl-10"
            required
          />
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Checkbox id="terms" checked={agreed} onCheckedChange={setAgreed} />
          <label htmlFor="terms">
            I agree to the
            <a href="/terms" className="text-brandMainColor hover:underline">
              Terms & Conditions
            </a>
          </label>
        </div>

        {/* Register Button */}
        <Button
          onClick={handleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "Register"}
        </Button>

        {/* Already have an account? */}
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?
          <Link to="/login" className="text-brandMainColor hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
