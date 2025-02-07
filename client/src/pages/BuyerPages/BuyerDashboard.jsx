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
import { CheckCircle, Clock, TrendingUp, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { NumberTicker } from "@/components/magicui/number-ticker";

const BuyerDashboard = () => {
  const { user, token } = useAuth();
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "https://carbonease-api.onrender.com/api/credits/payment-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Posted Data", response.data.transactions);

        if (Array.isArray(response.data.transactions)) {
          setRecentPurchases(response.data.transactions);

          // ✅ Calculate the total sum of the 'amount' key
          const total = response.data.transactions.reduce(
            (sum, transaction) => sum + (transaction.amount || 0),
            0
          );
          setTotalAmount(total); // ✅ Update state with total amount
        } else {
          console.error("Invalid data format:", response.data);
        }

        if (Array.isArray(response.data.transactions)) {
          setRecentPurchases(response.data.transactions);

          // ✅ Calculate the total sum of the 'amount' key
          const total = response.data.transactions.reduce(
            (sum, transaction) => sum + (transaction.amount || 0),
            0
          );
          setTotalAmount(total); // ✅ Update state with total amount
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [token]);

  const overviewData = [
    {
      title: "Total Credits Purchased",
      value: 20,
      icon: <TrendingUp size={24} />,
    },
    {
      title: "Total Spent",
      value: totalAmount || 0,
      icon: <CheckCircle size={24} />,
    },
    {
      title: "Total Orders",
      value: user?.transactions?.length || 0,
      icon: <Clock size={24} />,
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
                {/* {item.value} */}
                <NumberTicker
                  value={item.value || 0}
                  className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white"
                />
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
              <TableHeader className="bg-slate-100">
                <TableRow>
                  {/* <TableHead>ID</TableHead> */}
                  <TableHead>Seller</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {recentPurchases.length > 0 ? (
                  recentPurchases.map((order) => (
                    <TableRow key={order._id}>
                      {/* <TableCell>{order._id}</TableCell> */}
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
            </div>
          </CardContent>
          {/* <Button className="mt-4 bg-green-500">Edit Profile</Button> */}
        </Card>
      </div>
    </div>
  );
};

export default BuyerDashboard;
