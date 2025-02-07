import express from "express";
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  deleteAllListings,
  filterListings,
  getPostedListingForUser,
  makePayment,
  getTransactionData,
} from "../controllers/listingController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Create a new carbon credit listing
router.post("/post", authMiddleware, createListing);
router.get("/posted-data", authMiddleware, getPostedListingForUser);
router.post("/payment", authMiddleware, makePayment);
router.get("/payment-data", authMiddleware, getTransactionData);

// ✅ Get all carbon credit listings
router.get("/", getListings);

// ✅ Get a specific carbon credit listing by ID
router.get("/:id", getListingById);

// ✅ Filter API to filter listings based on the given parameters
router.get("/", filterListings);

// ✅ Update a carbon credit listing
router.put("/:id", updateListing);

// ✅ Delete a carbon credit listing
router.delete("/:id", deleteListing);

// ✅ Delete all carbon credit listings
router.delete("/", deleteAllListings);

export default router; // Exporting the router
