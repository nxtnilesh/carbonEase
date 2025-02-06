import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const PopupForm = ({ isOpen, closePopup, apiUrl }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // seller: "", // Should be fetched via authentication
    quantity: "",
    pricePerCredit: "",
    totalPrice: "",
    location: "",
    projectType: "",
    verification: {
      verifiedBy: "",
      certificateUrl: "",
    },
    status: "Available",
  });

  // Auto-calculate totalPrice
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      totalPrice: prev.quantity * prev.pricePerCredit || 0,
    }));
  }, [formData.quantity, formData.pricePerCredit]);

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
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
        pricePerCredit: Number(formData.pricePerCredit),
        totalPrice: Number(formData.totalPrice),
        verification: {
          verifiedBy: formData.verification.verifiedBy || "Others",
          certificateUrl: formData.verification.certificateUrl || "",
        },
      };

      await axios.post(apiUrl, payload);
      alert("Listing created successfully!");
      closePopup();
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closePopup}>
      <DialogContent className="max-w-4xl mx-auto p-6 rounded-lg bg-white shadow-lg w-full overflow-y-auto max-h-[90vh]">
        <DialogTitle className="text-2xl font-semibold text-gray-700">
          Create a New Listing
        </DialogTitle>
        <DialogDescription className="text-sm text-gray-500 mb-6">
          Fill in the details below to create a new listing for carbon credits.
        </DialogDescription>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <Input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
            <Input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" min="1" />
            <Input name="pricePerCredit" type="number" value={formData.pricePerCredit} onChange={handleChange} placeholder="Price per Credit" min="0" />
            <Input name="totalPrice" type="number" value={formData.totalPrice} readOnly placeholder="Total Price (Auto-calculated)" />

            <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />

            <Select onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
              <SelectTrigger>
                <span>{formData.projectType || "Select Project Type"}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Reforestation">Reforestation</SelectItem>
                <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
                <SelectItem value="Waste Management">Waste Management</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleVerificationChange({ target: { name: "verifiedBy", value } })}>
              <SelectTrigger>
                <span>{formData.verification.verifiedBy || "Select Verification"}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="VCS">VCS</SelectItem>
                <SelectItem value="Gold Standard">Gold Standard</SelectItem>
                <SelectItem value="CDM">CDM</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>

            <Input name="certificateUrl" value={formData.verification.certificateUrl} onChange={handleVerificationChange} placeholder="Certificate URL (Optional)" />

            <Select onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <span>{formData.status}</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button type="submit" className="mt-6 w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg py-2">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PopupForm;
