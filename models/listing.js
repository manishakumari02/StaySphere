const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },    
    description:String,
    image:{
        type:String,
        default:"https://unsplash.com/photos/airplane-wing-and-clouds-seen-from-a-window-ezyImh0IxOU",
        set: (v)=>v===""?"https://unsplash.com/photos/airplane-wing-and-clouds-seen-from-a-window-ezyImh0IxOU":v,   //if user does not enter image then show default
    },
    price:Number,
    location:String,
    country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;