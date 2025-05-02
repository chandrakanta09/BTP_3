const Listing = require("../models/listing");

module.exports.index=async(req,res)=>{
    let allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.filterListings = async (req, res) => {
    try {
        console.log(req.query);

        const { source, destination, date, departureTimeRange, arrivalTimeRange, price, busType } = req.query;

        let filterQuery = {
            source,
            destination,
            date
        };

        if (busType) {
            filterQuery.busType = busType;
        }
        if (price) {
            filterQuery.price = { $lte: price };
        }

        let listings = await Listing.find(filterQuery);

        if (departureTimeRange && departureTimeRange !== "") {
            const [startDep, endDep] = departureTimeRange.split("-");
            listings = listings.filter(listing => listing.departureTime >= startDep && listing.departureTime <= endDep);
        }

        if (arrivalTimeRange && arrivalTimeRange !== "") {
            const [startArr, endArr] = arrivalTimeRange.split("-");
            listings = listings.filter(listing => listing.arrivalTime >= startArr && listing.arrivalTime <= endArr);
        }

        res.render("listings/results.ejs", { listings });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
};
