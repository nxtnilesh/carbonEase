import express from "express";
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
  filterListings,
} from "../controllers/listingController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Create a new carbon credit listing
router.post("/post",authMiddleware, createListing);

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

export default router; // Exporting the router
