import CarbonCredit from "../models/Listing.js"; // Import model
import transactionsModel from "../models/transactionsModel.js";
import userModel from "../models/userModel.js";
import logger from "../utils/logger.js";

// ✅ Create a new listing
export const createListing = async (req, res) => {
  try {
    const userId = req.user.userId;
    const newListing = new CarbonCredit(req.body);
    const listingData = await newListing.save();
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $push: { posted: listingData._id } },
      { new: true, runValidators: true }
    );
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

// ✅ Get filtered listings
export const filterListings = async (req, res) => {
  try {
    const {
      projectType,
      status,
      location,
      minPrice,
      maxPrice,
      minQuantity,
      maxQuantity,
      verifiedBy,
    } = req.query;

    // Create a filter object dynamically
    let filter = {};

    if (projectType) filter.projectType = projectType;
    if (status) filter.status = status;
    // if (location) filter.location = location;
    // if (verifiedBy) filter["verification.verifiedBy"] = verifiedBy;
    if (minPrice || maxPrice) filter.pricePerCredit = {};
    if (minPrice) filter.pricePerCredit.$gte = Number(minPrice);
    if (maxPrice) filter.pricePerCredit.$lte = Number(maxPrice);
    if (minQuantity || maxQuantity) filter.quantity = {};
    if (minQuantity) filter.quantity.$gte = Number(minQuantity);
    if (maxQuantity) filter.quantity.$lte = Number(maxQuantity);

    // Fetch listings based on filters
    const listings = await CarbonCredit.find(filter);
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update a listing
export const updateListing = async (req, res) => {
  try {
    const updatedListing = await CarbonCredit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedListing)
      return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ✅ Delete a listing
export const deleteListing = async (req, res) => {
  try {
    const deletedListing = await CarbonCredit.findByIdAndDelete(req.params.id);
    if (!deletedListing)
      return res.status(404).json({ message: "Listing not found" });
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const filterListing = async (req, res) => {
  try {
    const { projectType, location, minPrice, maxPrice, status } = req.query;

    let filter = {};

    if (projectType) filter.projectType = projectType;
    if (location) filter.location = location; // Case-insensitive search
    if (status) filter.status = status;
    if (minPrice || maxPrice) filter.pricePerCredit = {};
    if (minPrice) filter.pricePerCredit.$gte = Number(minPrice);
    if (maxPrice) filter.pricePerCredit.$lte = Number(maxPrice);

    const listings = await CarbonCredit.find(filter);
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPostedListingForUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postedDataByUser = await userModel
      .findById(userId)
      .populate({
        path: "posted",
      })
      .select("posted");
    console.log(userId);

    return res.status(200).json(postedDataByUser);
  } catch (error) {
    logger.error("Get posted data", error);
  }
};

export const getTransactionData = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postedDataByUser = await userModel
      .findById(userId)
      .populate({
        path: "transactions",
      })
      .select("transactions");

    return res.status(200).json(postedDataByUser);
  } catch (error) {
    logger.error("Get posted data", error);
  }
};

export const makePayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { amount, quantity, sellerName } = req.body;
    console.log("amount", amount, quantity, sellerName);
    const data = new transactionsModel({
      amount,
      quantity,
      userId: userId,
      sellerName,
    });
    await data.save();
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $push: { transactions: data._id } },
      { new: true, runValidators: true }
    );
    return res.status(200).json(data);
  } catch (error) {
    logger.info("Error in makePayment", error);
  }
};
