import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";
import AboutUs from "./pages/Aboutus";
import CarbonEmissionCalculator from "./pages/Calculator";
import Navbar from "./components/common/Navbar";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/common/Footer";
import DashboardLayout from "./pages/SellerDashboar";
import DataForm from "./pages/SellerPages/PopupForm";
import ListingsPage from "./pages/SellerPages/AllListings";
import SellerDashboard from "./pages/SellerPages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes - Accessible to non-authenticated users */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LandingPage />} />

            {/* Auth routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/calculator" element={<CarbonEmissionCalculator />} />
            <Route path="/seller" element={<DashboardLayout />} />
            <Route path="/form" element={<DataForm />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
          </Route>

          {/* Protected Routes - Only for authenticated users */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Default Route */}
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
      <Footer />
    </AuthProvider>
  );
};

export default App;
