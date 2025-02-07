import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  MapPin,
  DollarSign,
  Info,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";

const Marketplace = () => {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    projectType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/credits");
      setListings(response.data);
      console.log("respone", response);
    } catch (err) {
      setError("Failed to load listings");
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(
        `http://localhost:3000/api/credits/filters?${query}`
      );
      setListings(response.data);
    } catch (err) {
      setError("Failed to filter listings");
    }
    setLoading(false);
  };

  const openListingDetails = (listing) => {
    setSelectedListing(listing);
    setIsDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-[250px_1fr] gap-6 p-6">
      {/* Sidebar Filters */}
      <aside className="border-r pr-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Search size={20} /> Filters
        </h2>
        <div className="flex flex-col gap-3">
          <Input
            name="projectType"
            placeholder="Project Type"
            onChange={handleFilterChange}
          />
          <Input
            name="location"
            placeholder="Location"
            onChange={handleFilterChange}
          />
          <Input
            name="minPrice"
            placeholder="Min Price"
            type="number"
            onChange={handleFilterChange}
          />
          <Input
            name="maxPrice"
            placeholder="Max Price"
            type="number"
            onChange={handleFilterChange}
          />
          <Button
            className="bg-green-500 flex items-center gap-2"
            onClick={applyFilters}
          >
            <Search size={16} /> Apply Filters
          </Button>
          <Button
            onClick={fetchListings}
            className="bg-blue-500 flex items-center gap-2"
          >
            <RefreshCw size={16} /> Refresh Listings
          </Button>
        </div>
      </aside>

      {/* Listings Section */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Carbon Credit Marketplace</h1>

        {loading ? (
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Skeleton key={item} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card
                key={listing._id}
                className="p-4 border rounded-lg shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-200"
              >
                <CardContent>
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Info size={18} /> {listing.title}
                  </h2>
                  <p className="text-sm text-gray-600">{listing.description}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin size={16} className="text-blue-500" />{" "}
                    {listing.location}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <DollarSign size={16} className="text-green-500" /> $
                    {listing.pricePerCredit}/credit
                  </p>
                  <p className="text-sm text-gray-600">
                    Status: {listing.status}
                  </p>
                </CardContent>
                <div className="mt-4 flex justify-between">
                  <Button
                    onClick={() => openListingDetails(listing)}
                    className="bg-gray-700 flex items-center gap-2"
                  >
                    <Info size={16} /> View
                  </Button>
                  <Button
                    className="bg-green-500 flex items-center gap-2"
                    onClick={() =>
                      navigate(
                        `/payment?id=${listing._id}&amount=${
                          listing.pricePerCredit
                        }&title=${encodeURIComponent(
                          listing.title
                        )}&totalPrice=${listing.totalPrice}`
                      )
                    }
                  >
                    <ShoppingCart size={16} /> Buy
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Listing Details Dialog */}
      {isDialogOpen && selectedListing && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedListing.title}</DialogTitle>
            </DialogHeader>
            <p>{selectedListing.description}</p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin size={16} className="text-blue-500" /> Location:{" "}
              {selectedListing.location}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <DollarSign size={16} className="text-green-500" /> Price: $
              {selectedListing.pricePerCredit}/credit
            </p>
            <p className="text-sm text-gray-600">
              Quantity: {selectedListing.quantity}
            </p>
            <p className="text-sm text-gray-600">
              Status: {selectedListing.status}
            </p>
            <p className="text-sm text-gray-600">
              Verified By: {selectedListing.verification?.verifiedBy}
            </p>
            {selectedListing.verification?.certificateUrl && (
              <a
                href={selectedListing.verification.certificateUrl}
                className="text-blue-500 underline flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate
              </a>
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Marketplace;
