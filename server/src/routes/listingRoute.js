import express from "express";
import {
  createListing,
  getListings,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listingController.js";

const router = express.Router();

// ✅ Create a new carbon credit listing
router.post("/", createListing);

// ✅ Get all carbon credit listings
router.get("/", getListings);

// ✅ Get a specific carbon credit listing by ID
router.get("/:id", getListingById);

// ✅ Update a carbon credit listing
router.put("/:id", updateListing);

// ✅ Delete a carbon credit listing
router.delete("/:id", deleteListing);

export default router; // Exporting the router
