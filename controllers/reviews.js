const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    console.log(newReview);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);


    await newReview.save();
    await listing.save();

    // console.log("new review save");
    // res.send("new review saved");
     req.flash("success","new review created!");
    res.redirect(`/listings/${listing._id}`);
}
module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}); //for delete from listing
    await Review.findByIdAndDelete(reviewId);
     req.flash("success","review deleted!");
    res.redirect(`/listings/${id}`);
}