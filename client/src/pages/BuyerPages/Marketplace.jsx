import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";

const Marketplace = () => {
    const [listings, setListings] = useState([]);
    const [filters, setFilters] = useState({ projectType: "", location: "", minPrice: "", maxPrice: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedListing, setSelectedListing] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/credits");
            setListings(response.data);
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
            const response = await axios.get(`http://localhost:3000/api/credits/filters?${query}`);
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
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Carbon Credit Marketplace</h1>

            {/* Filter Inputs */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <input name="projectType" placeholder="Project Type" onChange={handleFilterChange} className="border p-2 rounded" />
                <input name="location" placeholder="Location" onChange={handleFilterChange} className="border p-2 rounded" />
                <input name="minPrice" placeholder="Min Price" type="number" onChange={handleFilterChange} className="border p-2 rounded" />
                <input name="maxPrice" placeholder="Max Price" type="number" onChange={handleFilterChange} className="border p-2 rounded" />
                <Button className="bg-green-500" onClick={applyFilters}>Apply Filters</Button>
            </div>

            {/* Listings Section */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={fetchListings} className="mb-4 bg-green-500">Refresh Listings</Button>

            <div className="grid grid-cols-3 gap-4">
                {listings.map((listing) => (
                    <Card key={listing._id} className="p-4 border rounded-lg shadow-md" onClick={() => openListingDetails(listing)}>
                        <CardContent>
                            <h2 className="text-xl font-semibold">{listing.title}</h2>
                            <p>{listing.description}</p>
                            <p className="text-sm text-gray-600">Location: {listing.location}</p>
                            <p className="text-sm text-gray-600">Price: ${listing.pricePerCredit}/credit</p>
                            <p className="text-sm text-gray-600">Status: {listing.status}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Listing Details Dialog */}
            {isDialogOpen && selectedListing && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedListing.title}</DialogTitle>
                        </DialogHeader>
                        <p>{selectedListing.description}</p>
                        <p className="text-sm text-gray-600">Location: {selectedListing.location}</p>
                        <p className="text-sm text-gray-600">Price: ${selectedListing.pricePerCredit}/credit</p>
                        <p className="text-sm text-gray-600">Quantity: {selectedListing.quantity}</p>
                        <p className="text-sm text-gray-600">Status: {selectedListing.status}</p>
                        <p className="text-sm text-gray-600">Verified By: {selectedListing.verification?.verifiedBy}</p>
                        {selectedListing.verification?.certificateUrl && (
                            <a href={selectedListing.verification.certificateUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">View Certificate</a>
                        )}
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Marketplace;
