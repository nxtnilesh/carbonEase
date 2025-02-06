import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
    </div>
  )
}
