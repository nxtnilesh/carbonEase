import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import auth from "../../public/auth.jpg";
import { toast } from "sonner";

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
      toast.success("Login successful! Redirecting to home...");
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg h-full my-8">
      <div className="flex">
        <div>
          <img src={auth} alt="auth" width={300} />
        </div>
        <div className="flex-1 px-6">
          <h1 className="text-2xl font-bold text-center text-brandMainColor mb-2">
            Welcome Back!
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
            Login to your account to continue.
          </p>

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
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5 mr-2" />
              ) : (
                "Login"
              )}
            </Button>

            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              Don't have an account?
              <Link
                to="/register"
                className="text-brandMainColor hover:underline"
              >
                {" "}
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
