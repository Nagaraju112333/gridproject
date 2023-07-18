const routes=(module.exports=require("express")())
//const pinDetails = require("../models/addpinModel");
const {alladdpinFunctions}=require("../services/addpinModel")
const {allpinacceptancefunctions}=require("../services/pinacceptance")
routes.post("/addUsersInPin",async (req,res)=>{
    try{
        let assignUsersTopin=await allpinacceptancefunctions.fcnassignUsersTopin(req.body,req.id,req.role,req.query.pin);
        res.send(assignUsersTopin);
    }
    catch(err){
        res.send(err)
    }
})