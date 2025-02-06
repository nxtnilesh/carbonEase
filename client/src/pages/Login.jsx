// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { loginUser } from "../services/authService";
// import { useAuth } from "../context/AuthContext";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { setUser } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const { user } = await loginUser(email, password);
//       console.log("User", user);

//       setUser(user);
//       navigate("/profile");
//     } catch (error) {
//       alert("Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <Input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//       />
//       <Input
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         type="password"
//       />
//       <Button onClick={handleLogin} loading={loading}>
//         Login
//       </Button>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const { user } = await loginUser(email, password);
      setUser(user);
      navigate("/profile");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
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

        <Button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : "Login"}
        </Button>
      </div>
    </div>
  );
};

export default Login;
