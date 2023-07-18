

const routes=(module.exports=require("express")())
//const pinDetails = require("../models/addpinModel");
const {alladdpinFunctions}=require("../services/addpinModel")
routes.post("/addpin",async (req,res)=>{
    //console.log(req.role,"addpin route")
    try {
        let addpin=await alladdpinFunctions.fcnaddPin(req.body,req.role);
        res.send(addpin)
    } catch (error) {
        res.send(error)
    }
});
routes.get("/getAllpinsbyuserwise",async(req,res)=>{
     try{
        let getallpinsbyuserwose=await alladdpinFunctions.fcnGetAllPInsByUserWise(req.id,req.role);
        res.send(getallpinsbyuserwose);
     }
     catch(err){
        res.send(err)
     }
})
routes.get("/getAllpins",async(req,res)=>{
    console.log(req.id,"id");
    console.log(req.role,"role")
    try{
      let getallpins=await alladdpinFunctions.fcngetAllPins(req.id,req.role);
      res.send(getallpins);
    }
    catch(err){
        res.send(err)
    }
})

