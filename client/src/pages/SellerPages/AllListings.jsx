import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";

const ListingsPage = () => {
  const [listings, setListings] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "https://carbonease-api.onrender.com/api/credits/posted-data",
          // "http://localhost:3000/api/credits/posted-data",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include Bearer token
            },
          }
        );

        console.log("Posted Data", response.data.posted);
        setListings(response.data.posted);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const updatedListing = await axios.put(`/api/listings/${id}`, { status });
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === id
            ? { ...listing, status: updatedListing.data.status }
            : listing
        )
      );
    } catch (error) {
      console.error("Error updating listing status:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">All Listings</h1>
      <div className="overflow-x-auto">
        <Table className="w-full border-collapse">
          <TableBody>
            <TableRow className="bg-gray-100">
              <TableCell className="font-semibold text-left px-4 py-2">
                Title
              </TableCell>
              <TableCell className="font-semibold text-left px-4 py-2">
                Description
              </TableCell>
              <TableCell className="font-semibold text-left px-4 py-2">
                Quantity
              </TableCell>
              <TableCell className="font-semibold text-left px-4 py-2">
                Price per Credit
              </TableCell>
              <TableCell className="font-semibold text-left px-4 py-2">
                Status
              </TableCell>
              <TableCell className="font-semibold text-left px-4 py-2">
                Actions
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            {listings && listings.length > 0 ? (
              listings.map((listing) => (
                <TableRow key={listing._id} className="border-b">
                  <TableCell className="px-4 py-2">{listing?.title}</TableCell>
                  <TableCell className="px-4 py-2">
                    {listing?.description}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {listing.quantity}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    {listing.pricePerCredit}
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <Select
                      value={listing.status}
                      onValueChange={(value) =>
                        handleStatusChange(listing._id, value)
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Sold">Sold</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="px-4 py-2">
                    <Button
                      className="bg-green-500"
                      onClick={() => handleStatusChange(listing._id, "Sold")}
                    >
                      Mark as Sold
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" className="text-center py-4">
                  No listings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ListingsPage;
