import CarbonCredit from "../models/Listing.js"; // Import model

// ✅ Create a new listing
export const createListing = async (req, res) => {
    try {
        const newListing = new CarbonCredit(req.body);
        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Get all listings
export const getListings = async (req, res) => {
    try {
        const listings = await CarbonCredit.find();
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get a specific listing by ID
export const getListingById = async (req, res) => {
    try {
        const listing = await CarbonCredit.findById(req.params.id);
        if (!listing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update a listing
export const updateListing = async (req, res) => {
    try {
        const updatedListing = await CarbonCredit.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedListing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json(updatedListing);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// ✅ Delete a listing
export const deleteListing = async (req, res) => {
    try {
        const deletedListing = await CarbonCredit.findByIdAndDelete(req.params.id);
        if (!deletedListing) return res.status(404).json({ message: "Listing not found" });
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
