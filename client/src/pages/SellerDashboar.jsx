import { Sidebar } from "@/components/sidebar"
import SellerDashboard from "@/pages/SellerPages/Dashboard"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <SellerDashboard/>
    </div>
  )
}
