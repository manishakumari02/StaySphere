const express=require("express");
const router=express.Router({mergeParams:true});  //child route used in parents like id so reviews find by id and work
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing = require("../models/listing.js");
const {validateReview}=require("../middleware.js");



//Review route
//post review rooute
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    // console.log("new review save");
    // res.send("new review saved");
     req.flash("success","new review created!");
    res.redirect(`/listings/${listing._id}`);
}))
//DELETE REVIEW ROUTE 
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}); //for delete from listing
    await Review.findByIdAndDelete(reviewId);
     req.flash("success","review deleted!");
    res.redirect(`/listings/${id}`);
}))

module.exports=router;