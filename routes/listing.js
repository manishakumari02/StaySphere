const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing = require("../models/listing.js");


const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
        if(error){
            let errorMsg=error.details.map((el)=>el.message).join(",");
            throw new ExpressError(400,errorMsg);

        }
        else{
            next();
        }
}

//index route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });

}));

//new route
router.get("/new", (req, res) => {
    res.render("listings/new");
})

//create route
router.post("/",validateListing, wrapAsync(async(req, res, next) => {
    // let {title,description,image,price,country,location}=req.body;
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");

}))

//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show", { listing });
}))
//Edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
}))
//UPDATE ROUTE
router.put("/:id",validateListing, wrapAsync(async (req, res) => {
    // if(!req.body.listings){
    //     throw new ExpressError(404,"send valid data for listing");
    // }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}))
//DELETE ROUTE
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedRes = await Listing.findByIdAndDelete(id);
    console.log(deletedRes);
    res.redirect("/listings");
}))

module.exports=router;