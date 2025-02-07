import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
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
  
  const [isOpen, setIsOpen] = useState(true);

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

      await axios.post("http://localhost:3000/api/credits/post", payload);
      alert("Listing created successfully!");
      setFormData({
        title: "",
        description: "",
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
    } catch (error) {
      console.error("Error creating listing:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create a New Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <Input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
          <Input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" min="1" />
          <Input name="pricePerCredit" type="number" value={formData.pricePerCredit} onChange={handleChange} placeholder="Price per Credit" min="0" />
          <Input name="totalPrice" type="number" value={formData.totalPrice} readOnly placeholder="Total Price (Auto-calculated)" />
          <Input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          
          <Select onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
            <SelectTrigger>{formData.projectType || "Select Project Type"}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Reforestation">Reforestation</SelectItem>
              <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
              <SelectItem value="Waste Management">Waste Management</SelectItem>
              <SelectItem value="Agriculture">Agriculture</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleVerificationChange({ target: { name: "verifiedBy", value } })}>
            <SelectTrigger>{formData.verification.verifiedBy || "Select Verification"}</SelectTrigger>
            <SelectContent>
              <SelectItem value="VCS">VCS</SelectItem>
              <SelectItem value="Gold Standard">Gold Standard</SelectItem>
              <SelectItem value="CDM">CDM</SelectItem>
              <SelectItem value="Others">Others</SelectItem>
            </SelectContent>
          </Select>

          <Input name="certificateUrl" value={formData.verification.certificateUrl} onChange={handleVerificationChange} placeholder="Certificate URL (Optional)" />

          <Select onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>{formData.status}</SelectTrigger>
            <SelectContent>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Sold">Sold</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormComponent;