import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  MapPin,
  IndianRupee,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Info,
  ShoppingCart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const navigate = useNavigate()
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    minPrice: "",
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://carbonease-api.onrender.com/api/credits"
      );
      setListings(response.data);
    } catch (err) {
      setError("Failed to load listings");
    }
    setLoading(false);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let filtered = [...listings];

    // Filter by Title (substring match)
    if (filters.title) {
      filtered = filtered.filter((listing) =>
        listing.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    // Filter by Location
    if (filters.location) {
      filtered = filtered.filter((listing) =>
        listing.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Filter by Min Price (greater than or equal)
    if (filters.minPrice) {
      filtered = filtered.filter(
        (listing) => listing.pricePerCredit >= Number(filters.minPrice)
      );
    }

    setListings(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    const sortedListings = [...listings].sort((a, b) =>
      value === "asc"
        ? a.pricePerCredit - b.pricePerCredit
        : b.pricePerCredit - a.pricePerCredit
    );
    setListings(sortedListings);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentListings = listings.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(listings.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
      {/* Sidebar Filters (Desktop) */}
      <aside className="hidden md:block border-r pr-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
          <Search size={20} /> Filters
        </h2>
        <div className="flex flex-col gap-3">
          <Input
            name="title"
            placeholder="Title"
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

      {/* Filters (Mobile Sheet) */}
      <div className="md:hidden flex justify-between items-center">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Search size={20} /> Filters
            </h2>
            <div className="flex flex-col gap-3">
              <Input
                name="title"
                placeholder="Title"
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
          </SheetContent>
        </Sheet>
      </div>

      {/* Listings Section */}
      <section className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Carbon Credit Marketplace</h1>
          <Select onValueChange={handleSortChange} defaultValue="asc">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-40 w-full rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentListings.map((listing) => (
                <Card
                  key={listing._id}
                  className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <CardContent>
                    <h2 className="text-xl font-semibold">{listing.title}</h2>
                    <p className="text-sm text-gray-600">
                      {listing.description}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin size={16} className="text-blue-500" />{" "}
                      {listing.location}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <IndianRupee size={16} className="text-green-500" />
                      {listing.pricePerCredit}/credit
                    </p>
                    {/* <Button
                      onClick={() => openListingDetails(listing)}
                      className="bg-gray-700 flex items-center gap-2"
                    >
                      <Info size={16} /> View
                    </Button> */}
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
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 mt-6">
              <Button onClick={prevPage} disabled={currentPage === 1}>
                <ChevronLeft /> Prev
              </Button>
              <Button
                onClick={nextPage}
                disabled={indexOfLastItem >= listings.length}
              >
                Next <ChevronRight />
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Marketplace;
