import { SellerSidebar } from "@/components/SellerSidebar"
import SellerDashboard from "@/pages/SellerPages/SellerDashboard"

export default function SellerDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SellerSidebar />
      <SellerDashboard/>
    </div>
  )
}
