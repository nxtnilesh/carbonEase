import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, TrendingUp, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import axios from "axios";

const BuyerDashboard = () => {
  const { user, token } = useAuth();
  console.log("UserData", user);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        // const response = await axios.get("http://localhost:3000/api/credits");
        const response = await axios.get(
          "http://localhost:3000/api/credits/payment-data",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include Bearer token
            },
          }
        );

        console.log("Posted Data", response);
        // setListings(response.data.posted);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);
  const overviewData = [
    {
      title: "Total Credits Purchased",
      value: user?.totalCredits,
      icon: <TrendingUp size={24} />,
    },
    {
      title: "Total Spent",
      value: user?.totalSpents || 0,
      icon: <CheckCircle size={24} />,
    },
    { title: "Total Orders", value: user?.tranctions?.length || 0, icon: <Clock size={24} /> },
  ];

  const recentPurchases = [
    {
      id: "ORD1234",
      seller: "Green Energy Ltd.",
      amount: "600",
      price: "$3,000",
      status: "Completed",
    },
    {
      id: "ORD5678",
      seller: "Eco Trust",
      amount: "400",
      price: "$2,000",
      status: "Pending",
    },
  ];

  const availableListings = [
    {
      id: "LIST101",
      seller: "Solar Solutions",
      credits: "1200",
      price: "$6,000",
      status: "Available",
    },
    {
      id: "LIST102",
      seller: "Wind Power Inc.",
      credits: "800",
      price: "$4,000",
      status: "Available",
    },
  ];


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Left Column: Overview Cards and Transactions */}
      <div className="col-span-3 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {overviewData.map((item, index) => (
            <Card key={index} className="p-4 flex flex-col items-center">
              {item.icon}
              <CardHeader>
                <CardTitle className="text-center">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {item.value}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Purchases */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPurchases.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.seller}</TableCell>
                    <TableCell>{order.amount} Credits</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Completed" ? "success" : "warning"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Available Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Available Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Credits</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availableListings.map((listing) => (
                  <TableRow key={listing.id}>
                    <TableCell>{listing.id}</TableCell>
                    <TableCell>{listing.seller}</TableCell>
                    <TableCell>{listing.credits}</TableCell>
                    <TableCell>{listing.price}</TableCell>
                    <TableCell>
                      <Badge variant="success">{listing.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: User Profile */}
      <div className="space-y-6">
        <Card className="flex flex-col items-center p-6">
          <div className="bg-slate-200 rounded-full p-4">
            <User size={40} />
          </div>
          <CardHeader>
            <CardTitle className="text-center text-xl">{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-600">
              <p>{user.email}</p>
              <p>Total Credits: {user?.totalCredits || 0}</p>
            </div>
          </CardContent>
          <Button className="mt-4 bg-green-500">Edit Profile</Button>
        </Card>
      </div>
    </div>
  );
};

export default BuyerDashboard;
