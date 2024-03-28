const express=require("express");
const app= express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js")
const path = require("path");
const methodOvveride = require("method-override"); 
const ejsMate=require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require ("./utils/ExpressError.js");

let MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";
main().then(()=>{
console.log("connected to DB")
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);

}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}))
app.use(methodOvveride("_method"));
app.engine('ejs',ejsMate)
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("hi i am root")
})

//index route
app.get("/listings",  wrapAsync(async(req,res)=>{
   const allListings=await Listing.find({});
   res.render("listings/index.ejs",{allListings});

    }))
        //new route
        app.get("/listings/new", (req,res)=>{
            res.render("listings/new.ejs")
        });



    //show route
    app.get("/listings/:id", wrapAsync(async(req,res)=>{
        let {id}=req.params;
        let listing = await Listing.findById(id);
        res.render("listings/show.ejs",{listing})
    }));
        //create route
        app.post("/listings", 
        wrapAsync(async(req,res,next)=>{
        
          
                const newListing=  new Listing(req.body.listing);
                await newListing.save();
                res.redirect("/listings");
               
          }));



//update route
app.get("/listings/:id/edit", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
}));
//update 
app.put("/listings/:id", wrapAsync(async(req,res)=>{
    let {id}= req.params;
  await  Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect("/listings");

}));
//delete route
app.delete("/listings/:id", wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deleteListing= await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings")
}))
// app.get("/testListing",async (req,res)=>{
// let sampleListing = new Listing({
//     title:"My new Villa",
//     description:"BY the beach",
//     price:1200,
//     location:"Calangute,Goa",
//     country:"India"
// });
//  await sampleListing.save();
//  console.log(" sample was saved");
//  res.send("successfull test")

// });
app.all("*",(req,res,next)=>{

    next( new ExpressError(404,"page not found"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="somthing went wrong"}= err;
    res.status(statusCode).send(message);
    
   
})
app.listen(8080,()=>{
    console.log("server is listening on port :8080")
})