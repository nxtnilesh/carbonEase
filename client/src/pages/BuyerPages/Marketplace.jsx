import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Marketplace = () => {
    const [listings, setListings] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/credits");
            const data = await response.json();
            setListings(data);
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
            const response = await fetch(`/api/listings?${query}`);
            const data = await response.json();
            setListings(data);
        } catch (err) {
            setError("Failed to filter listings");
        }
        setLoading(false);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Carbon Credit Marketplace</h1>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <input name="projectType" placeholder="Project Type" onChange={handleFilterChange} className="border p-2 rounded" />
                <input name="location" placeholder="Location" onChange={handleFilterChange} className="border p-2 rounded" />
                <input name="minPrice" placeholder="Min Price" type="number" onChange={handleFilterChange} className="border p-2 rounded" />
                <input name="maxPrice" placeholder="Max Price" type="number" onChange={handleFilterChange} className="border p-2 rounded" />
                <Button onClick={applyFilters}>Apply Filters</Button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={fetchListings} className="mb-4">Refresh Listings</Button>
            <div className="grid grid-cols-3 gap-4">
                {listings.map((listing) => (
                    <Card key={listing._id} className="p-4 border rounded-lg shadow-md">
                        <CardContent>
                            <h2 className="text-xl font-semibold">{listing.title}</h2>
                            <p>{listing.description}</p>
                            <p className="text-sm text-gray-600">Location: {listing.location}</p>
                            <p className="text-sm text-gray-600">Price: ${listing.pricePerCredit}/credit</p>
                            <p className="text-sm text-gray-600">Status: {listing.status}</p>
                            <Button className="mt-2">View Details</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Marketplace;