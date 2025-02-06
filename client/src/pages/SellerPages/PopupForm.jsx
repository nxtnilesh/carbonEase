import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';

const PopupForm = ({ isOpen, closePopup, apiUrl }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    seller: '', // Assume seller is pre-determined or obtained via auth
    quantity: '',
    pricePerCredit: '',
    totalPrice: '',
    location: '',
    projectType: '',
    verification: {
      verifiedBy: '',
      certificateUrl: '',
    },
    status: 'Available',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVerificationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      verification: {
        ...prevData.verification,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, formData);
      alert('Listing created successfully');
      closePopup();
    } catch (error) {
      alert('Error creating listing: ' + error.message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closePopup}>
      <DialogContent className="max-w-4xl mx-auto p-6 rounded-lg bg-white shadow-lg w-full overflow-y-auto max-h-[90vh]">
        <DialogTitle className="text-2xl font-semibold text-gray-700">Create a New Listing</DialogTitle>
        <DialogDescription className="text-sm text-gray-500 mb-6">
          Fill in the details below to create a new listing for carbon credits.
        </DialogDescription>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Title</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Description</label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Quantity</label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="mt-2 p-2 border border-gray-300 rounded-lg"
                min="1"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Price per Credit</label>
              <Input
                type="number"
                name="pricePerCredit"
                value={formData.pricePerCredit}
                onChange={handleChange}
                placeholder="Enter price per credit"
                className="mt-2 p-2 border border-gray-300 rounded-lg"
                min="0"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Total Price</label>
              <Input
                type="number"
                name="totalPrice"
                value={formData.totalPrice}
                onChange={handleChange}
                placeholder="Enter total price"
                className="mt-2 p-2 border border-gray-300 rounded-lg"
                min="0"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Location</label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location"
                className="mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Project Type</label>
              <Select
                value={formData.projectType}
                onChange={(value) => setFormData({ ...formData, projectType: value })}
                className="mt-2 border border-gray-300 rounded-lg"
              >
                <SelectTrigger>
                  <span>{formData.projectType || 'Select Project Type'}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reforestation">Reforestation</SelectItem>
                  <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                  <SelectItem value="Waste Management">Waste Management</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Verification</label>
              <Select
                value={formData.verification.verifiedBy}
                onChange={(value) => handleVerificationChange({ target: { name: 'verifiedBy', value } })}
                className="mt-2 border border-gray-300 rounded-lg"
              >
                <SelectTrigger>
                  <span>{formData.verification.verifiedBy || 'Select Verification Type'}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VCS">VCS</SelectItem>
                  <SelectItem value="Gold Standard">Gold Standard</SelectItem>
                  <SelectItem value="CDM">CDM</SelectItem>
                  <SelectItem value="Others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Certificate URL (Optional)</label>
              <Input
                type="text"
                name="certificateUrl"
                value={formData.verification.certificateUrl}
                onChange={handleVerificationChange}
                placeholder="Enter certificate URL"
                className="mt-2 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Status</label>
              <Select
                value={formData.status}
                onChange={(value) => setFormData({ ...formData, status: value })}
                className="mt-2 border border-gray-300 rounded-lg"
              >
                <SelectTrigger>
                  <span>{formData.status}</span>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Sold">Sold</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="mt-6 w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const DataForm = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true); // Open popup by default

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  return (
    <div>
      <PopupForm
        isOpen={isPopupOpen}
        closePopup={togglePopup}
        apiUrl="http://localhost:3000/api/credits/post" // Update with your actual API endpoint
      />
    </div>
  );
};

export default DataForm;
