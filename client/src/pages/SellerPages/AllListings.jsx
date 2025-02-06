import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table'; // ShadCN UI table
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

const ListingsPage = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/credits');
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const updatedListing = await axios.put(`/api/listings/${id}`, { status });
      setListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === id ? { ...listing, status: updatedListing.data.status } : listing
        )
      );
    } catch (error) {
      console.error('Error updating listing status:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">All Listings</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price per Credit</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listings.map((listing) => (
            <TableRow key={listing._id}>
              <TableCell>{listing.title}</TableCell>
              <TableCell>{listing.description}</TableCell>
              <TableCell>{listing.quantity}</TableCell>
              <TableCell>{listing.pricePerCredit}</TableCell>
              <TableCell>
                <Select
                  value={listing.status}
                  onChange={(e) => handleStatusChange(listing._id, e.target.value)}
                >
                  <SelectTrigger>
                    <span>{listing.status}</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">Available</SelectItem>
                    <SelectItem value="Sold">Sold</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleStatusChange(listing._id, 'Sold')}>Mark as Sold</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListingsPage;
