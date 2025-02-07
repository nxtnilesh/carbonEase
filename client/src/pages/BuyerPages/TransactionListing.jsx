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
import { useEffect, useState } from "react";
import axios from "axios";

const TransactionListing = () => {
  const { user, token } = useAuth();
  const [recentPurchases, setRecentPurchases] = useState([]);
  console.log("UserData", user);
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "https://carbonease-api.onrender.com/api/credits/payment-data",
          // "http://localhost:3000/api/credits/payment-data",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include Bearer token
            },
          }
        );

        console.log("Posted Data", response.data.transactions);
        setRecentPurchases(response.data.transactions);
        // setListings(response.data.posted);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);
  console.log("HJD", recentPurchases);

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
    {
      title: "Total Orders",
      value: user?.tranctions?.length || 0,
      icon: <Clock size={24} />,
    },
  ];

  // const recentPurchases = [
  //   {
  //     id: "ORD1234",
  //     seller: "Green Energy Ltd.",
  //     amount: "600",
  //     price: "$3,000",
  //     status: "Completed",
  //   },
  //   {
  //     id: "ORD5678",
  //     seller: "Eco Trust",
  //     amount: "400",
  //     price: "$2,000",
  //     status: "Pending",
  //   },
  // ];

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
    <div className="width">
      {/* Recent Purchases */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentPurchases.length > 0 ? (
                recentPurchases.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.sellerName}</TableCell>
                    <TableCell>{order.amount} Credits</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center">
                    No recent purchases found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionListing;
