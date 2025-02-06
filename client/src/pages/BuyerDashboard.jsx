import { BuyerSidebar } from "@/components/BuyerSidebar"
import BuyerDashboard from "@/pages/BuyerPages/BuyerDashboard"

export default function BuyerDashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <BuyerSidebar />
      <BuyerDashboard/>
    </div>
  )
}
