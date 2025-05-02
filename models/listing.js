const mongoose=require("mongoose");
const Review=require("./review.js");
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        url:String,
        filename:String
    },
    departureTime: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/  // validates HH:MM format (24-hour)
    },
    arrivalTime: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):([0-5]\d)$/  // validates HH:MM format (24-hour)
    },
    date: {
        type: String,
        required: true,
        match: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/ // validates DD-MM-YYYY format
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    busType: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;