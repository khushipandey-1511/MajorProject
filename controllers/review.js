const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    let id = req.params.id;
    let listing = await Listing.findById(req.params.id);
    let newListing = new Review(req.body.review);
    newListing.author = req.user._id;
    listing.reviews.push(newListing);
    await newListing.save();
    await listing.save();
    console.log("new review saved");
    req.flash("sucsess","Review added sucsessfully!")
    res.redirect(`/listings/${id}`);
}


module.exports.deleteReview=async(req,res)=>{
    let {id,reviewId} = req.params;
await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review deleted")
    res.redirect(`/listings/${id}`);
}
