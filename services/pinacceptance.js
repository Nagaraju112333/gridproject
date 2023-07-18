const {hasher}=require("../lib/hasher");
const pinAcceptance=require("../models/pinacceptance");
const stakeholders=require("../models/stakeholdersModel")
const {emailService}=require("../loaders/email");
const pinDetails=require("../models/addpinModel")


async function fcnassignUsersTopin(data,userid,userrole,pinNumber){
    try {
         //let userRole=await stakeholders.findOne({_id:userid},{role:1});
          if(userrole=="ENGINEER")
          {
            getPinDetails=await pinDetails.findOne({pin:pinNumber});
            getPinDetails.engineer=data
            await getPinDetails.save();
          } 
    } catch (error) {
      return error
    }
  }
  exports.allpinacceptancefunctions={
    fcnassignUsersTopin:fcnassignUsersTopin
  }