const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// router.route("/filter")
//     .post(wrapAsync(listingController.filterListings));

// Normal / route
router.route("/")
    .get(wrapAsync(listingController.index));

router.route("/filter")
    .get(wrapAsync(listingController.filterListings));

// Listing by id
router.route("/:id")
    .get(wrapAsync(listingController.showListing));

module.exports = router;
