const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");

const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");




const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then((res) => {
    console.log("connected mongo db");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized:true,
}
app.use(session(sessionOptions));

app.get("/", (req, res) => {
    res.send("Hi i am root path");
})

app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"page not found!"));
// });

//err handeling route
app.use((err, req, res, next) => {
    let {statusCode=500,message="something went wrong"}=err;
    // res.status(statusCode).send(message);
    // res.send("something went wrong");
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});


