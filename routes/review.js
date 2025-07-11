const express=require("express");
const router=express.Router({mergeParams:true});  //child route used in parents like id so reviews find by id and work
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js");
const Review=require("../models/review.js");
const Listing = require("../models/listing.js");



const validateReview=(req,res,next)=>{
      let {error}=reviewSchema.validate(req.body);
        if(error){
            let errorMsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(404,errorMsg);

        }
        else{
            next();
        }
}

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
    res.redirect(`/listings/${listing._id}`);
}))
//DELETE REVIEW ROUTE 
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}}); //for delete from listing
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}))

module.exports=router;