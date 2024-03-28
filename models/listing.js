const mongoose=require("mongoose");
const Schema= mongoose.Schema;

const listingSchema= new Schema({
    title:{
        type:String,
        required : true
    },
    description:String,
    image :{
        type: String,
        default: "https://unsplash.com/photos/photography-of-brown-high-rise-building-beside-seashore-during-daytime-b8kEUZqMNoQ" ,
        set:(v)=>v===""?"https://unsplash.com/photos/photography-of-brown-high-rise-building-beside-seashore-during-daytime-b8kEUZqMNoQ":v,

    },
    price:Number,
    location: String,
    country: String
});
const Listing=  mongoose.model("Listing", listingSchema);
module.exports= Listing;