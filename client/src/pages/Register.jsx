// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../services/authService";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     setLoading(true);
//     try {
//       await registerUser(email, password);
//       alert("OTP sent to your email!");
//       navigate("/verify-otp", { state: { email } });
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Register</h1>
//       <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//       <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
//       <Button onClick={handleRegister} loading={loading}>Register</Button>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mail, Lock } from "lucide-react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      await registerUser(email, password);
      alert("OTP sent to your email! Please verify.");
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

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

        {/* Register Button */}
        <Button
          onClick={handleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "Register"}
        </Button>
      </div>
    </div>
  );
};

export default Register;
