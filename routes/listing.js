const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");



//index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });

}));

//new route
router.get("/new",isLoggedIn, (req, res) => {
    res.render("listings/new");
})

//create route
router.post("/",isLoggedIn,validateListing, wrapAsync(async(req, res, next) => {
    // let {title,description,image,price,country,location}=req.body;
        const newListing = new Listing(req.body.listing);
        newListing.owner=req.user._id;
        await newListing.save();
        req.flash("success","new listing created!");
        res.redirect("/listings");

}))

//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show", { listing });
}))
//Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit", { listing });
}))
//UPDATE ROUTE
router.put("/:id",isLoggedIn,isOwner,validateListing, wrapAsync(async (req, res) => {
    // if(!req.body.listings){
    //     throw new ExpressError(404,"send valid data for listing");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
     req.flash("success","listing updated!");
    res.redirect(`/listings/${id}`);
}))
//DELETE ROUTE
router.delete("/:id",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedRes = await Listing.findByIdAndDelete(id);
    // console.log(deletedRes);
     req.flash("success","listing deleted!");
    res.redirect("/listings");
}))

module.exports=router;