import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FileText,
  ClipboardList,
  Tag,
  MapPin,
  DollarSign,
  CheckCircle,
  ShieldCheck,
  Link as LinkIcon,
  Upload,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import CurrencyDropdown from "@/components/common/CurrencyDropdown";
import FileUpload from "@/components/common/FileUpload";

const FormComponent = ({ isOpen, setIsOpen }) => {
  const { auth, token } = useAuth();

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

  // Auto-calculate total price
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
        // userId: user,
        verification: {
          verifiedBy: formData.verification.verifiedBy || "Others",
          certificateUrl: formData.verification.certificateUrl || "",
        },
      };

      const response = await axios.post(
        "http://localhost:3000/api/credits/post",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include Bearer token
            "Content-Type": "application/json",
          },
        }
      );
      toast({ title: "Listing created successfully!" });
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
      setIsOpen(!open);
    } catch (error) {
      console.error("Error creating listing:", error);
      // alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl max-h-[500px] overflow-scroll">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Create a New Listing
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="grid gap-1">
            <Label htmlFor="title">Title</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-500" />
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="pl-10"
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid gap-1">
            <Label htmlFor="description">Description</Label>
            <div className="relative">
              <ClipboardList className="absolute left-3 top-3 text-gray-500" />
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="pl-10"
              />
            </div>
          </div>

          {/* Quantity */}
          <div className="grid gap-1">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-3 text-gray-500" />
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                min="1"
                className="pl-10"
              />
            </div>
          </div>

          {/* Price per Credit */}
          <div className="grid gap-1">
            <Label htmlFor="pricePerCredit">Price per Credit</Label>
            <div className="relative flex">
              <CurrencyDropdown />
              <Input
                id="pricePerCredit"
                name="pricePerCredit"
                type="number"
                value={formData.pricePerCredit}
                onChange={handleChange}
                placeholder="Price per Credit"
                min="0"
                className="pl-10"
              />
            </div>
          </div>

          {/* Total Price (Read-Only) */}
          <div className="grid gap-1">
            <Label>Total Price (Auto-calculated)</Label>
            <div className="relative">
              <CheckCircle className="absolute left-3 top-3 text-gray-500" />
              <Input
                name="totalPrice"
                type="number"
                value={formData.totalPrice}
                readOnly
                placeholder="Total Price"
                className="pl-10 bg-gray-100"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid gap-1">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-500" />
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="pl-10"
              />
            </div>
          </div>

          {/* File handler */}
          <FileUpload />
          {/* Project Type */}

          <div className="grid gap-1">
            <Label>Project Type</Label>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, projectType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Project Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Reforestation">Reforestation</SelectItem>
                <SelectItem value="Renewable Energy">
                  Renewable Energy
                </SelectItem>
                <SelectItem value="Waste Management">
                  Waste Management
                </SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-brandMainColor w-full">
            Submit Listing
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormComponent;
