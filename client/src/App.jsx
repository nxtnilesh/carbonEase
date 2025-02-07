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
import SellerDashboardLayout from "./pages/SellerDashboar";
import DataForm from "./pages/SellerPages/PopupForm";
import ListingsPage from "./pages/SellerPages/AllListings";
import SellerDashboard from "./pages/SellerPages/SellerDashboard";
import ComingSoon from "./pages/comingsoon";
import BuyerDashboard from "./pages/BuyerPages/BuyerDashboard";
import BuyerDashboardLayout from "./pages/BuyerDashboard";
import Marketplace from "./pages/BuyerPages/Marketplace";
import ContactUs from "./pages/ContactUs";
import TransactionPage from "./pages/Transaction/TransactionPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {/* Full-height container with column layout */}
        <div className="flex flex-col min-h-screen">
          {/* Navbar always at the top */}
          <Navbar />

          {/* Main content with flex-1 to push footer to bottom */}
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/calculator" element={<CarbonEmissionCalculator />} />
                <Route path="/form" element={<DataForm />} />
                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
                <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
                <Route path="/coming" element={<ComingSoon />} />
                <Route path="/market" element={<Marketplace />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/payment" element={<TransactionPage />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/buyer" element={<BuyerDashboardLayout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/seller" element={<SellerDashboardLayout />} />
              </Route>

              {/* Default Route */}
              <Route path="*" element={<Login />} />
            </Routes>
          </main>

          {/* Footer always at the bottom */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
