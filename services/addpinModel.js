//const {emailService}=require("../loaders/email")
const {hasher}=require("../lib/hasher");
const pinDetails=require("../models/addpinModel");
const stakeholders=require("../models/stakeholdersModel")
const {emailService}=require("../loaders/email");
async function fcnaddPin(data,role,id){
   try {
    let randampin=Math.floor((Math.random()*1000000)+1)
        if(role=="ADMIN"){
          //console.log(role,"ser")
            let addpin=await new pinDetails({
            pin:randampin,
            ownershipType:data.ownershipType,
            ownershipStructure:data.ownershipStructure,
            owners:data.owners,
            municipality:data.municipality,
            pinInfo:data.pinInfo,
            createdOn:new Date()
           })
            await addpin.save(); 
            for (let i= 0; i <data.owners.length; i++) {
                let ownerid=data.owners[i].ownerID;
                let ownerEmail=await stakeholders.findOne({_id:ownerid},{emailID:1})
                //console.log(ownerEmail.emailID,"service owner emailid")
                emailService.addpinmessage(ownerEmail.emailID)
            }
           return ({messgae:"new pin added successfully done.."})
        }
        else{
            return ({messgae:"your not eligible for this action"})
        }
   } catch (error) {
    return error
   }
}
async function fcnGetAllPInsByUserWise(id,role){
   try{
       if(role=="ADMIN"){
        let getallpins=await pinDetails.find();
        if(getallpins!=undefined || getallpins!=null){
          return getallpins
        }
        else{
          return ({messgae:"no pins"})
        }
       }
       else{
        switch (role) {
          case "INDIVIDUAL":
            let individual=await getindividualuserPins(id,role);
            return individual;
            break;
              case "COUNTY":
              let county=await getCountyUserPinss(id,role);
              return county
              break;
              case "CONSERVATIONAUTHORITY":
              let conversationauthority=await getconversationuserpins(id,role);
               return conversationauthority
               break;
                case "MUNICIPALITY":
                let municipality=await getMunicipalityUserPins(id,role)
                return municipality
                break;
                case "LAWYER":
                let getallpinsbyLower=await getallLowerPins(id,role)
                return getallpinsbyLower;
                break;
                case "INSURER":
                let getinsurerpins=await getallinsurerpins(id,role);
                return getinsurerpins;
                break;
                case "LENDER":
                let getallLenderpins=await getalllenderpins(id,role);
                return getallLenderpins
                break;
              case "ENGINEER":
                let getengineerpins=await getAllEngineerPins(id,role)
                return getengineerpins
          default:
            break;
        }
       }

   }
   catch(err){
    return err
   }
}
async function getindividualuserPins(id,role){
     try{
        let ownerpins=await pinDetails.find({"owners.ownerID":id});
      console.log(ownerpins,"============")
        if(ownerpins.length>0){
          return ownerpins;
        }
        else{
          return ({messgae:"no pins"})
        }
       
        }
        catch(err){
         return err
        }

}
async function getCountyUserPinss(id,role){
  try {
     let getcountypins=await pinDetails.find({"pinInfo.county":id});
     console.log(getcountypins,"getcountyAll pins");
     if(getcountypins.length>0){
      return getcountypins;
     }
     else{
      return ({messgae:"no pins"})
     }
  } catch (error) {
    return error
  }
}
	async function getconversationuserpins(id,role){
  try {
     let getconvervationauthorityAllpins=await pinDetails.find({"pinInfo.conservationAuthority":id})
     if(getconvervationauthorityAllpins.length>0){
        return getconvervationauthorityAllpins;
     }
     else{
      return ({message:"no pins"})
     }
  } catch (error) {
    return error
  }
}
async function getMunicipalityUserPins(id,role){
  try {
     let getAllmunicipalityPins=await pinDetails.find({municipality:id});
     if(getAllmunicipalityPins.length>0){
      return getAllmunicipalityPins;
     }
     else{
      return ({message:"no pins"})
     }
    
  } catch (error) {
    return error
  }
}
async function getallLowerPins(id,role){
  try {
      let getlowerpins=await pinDetails.find({lower:id});
      if(getlowerpins.length>0){
        return getlowerpins
      }
      else{
        return ({message:"no pins"})
      }
  } catch (error) {
    return error
  }
}
async function getallinsurerpins(id,role){
  try {
     let getinsurerpins=await pinDetails.find({insurer:id});
     if(getinsurerpins.length>0){
      return getinsurerpins;
     }
     else{
      return ({message:"no pins"})
     }
  } catch (error) {
    return error
  }
}
async function getalllenderpins(id,role){
  try {
      let  getalllenderpins=await pinDetails.find({lender:id});
      if(getalllenderpins.length>0){
        return getalllenderpins
      }
      else{
        console.log("lender black")
        return ({message:"no pins"})
      }
  } catch (error) {
    return error
  }
}
async function getAllEngineerPins(id,role){
  try {
        let getAllEngineerpins=await pinDetails.find({engineer:id})
        if(getAllEngineerpins.length>0){
          return getAllEngineerpins
        }
        else{
          console.log("getallengineer black")
          return ({message:"no pins"})
        }
  } catch (error) {
    return error
  }
}
async function fcngetAllPins(id,role){
  //console.log(role,"service role")
  try{
   if(role=="ADMIN"){
    let array =[];
   //  console.log("admin black")
    let getallpins=await pinDetails.find();
     for (let i= 0; i<getallpins.length; i++) {
         let municipalityId=getallpins[i].municipality;
          let getmunicipalityUserDetails=await  stakeholders.findOne({_id:municipalityId});
          let getcountid=getallpins[i].pinInfo.county;
          let getcountUserDetails=await stakeholders.findOne({_id:getcountid});
          let conversationAuthorityId = getallpins[i].pinInfo.conservationAuthority; 
          let getConversationAuthorityUserDetails = await stakeholders.findOne({ _id: conversationAuthorityId });
          //console.log(getConversationAuthorityUserDetails,"===================conversationauthority user Details")
          let ownersWithDetails = [];
          for (let j= 0; j<getallpins[i].owners.length; j++) {

          let ownerid=getallpins[i].owners[j].ownerID;
          let getownerdetails=await stakeholders.findOne({_id:ownerid});
          ownersWithDetails.push(getownerdetails);
        }
        let object = {
          ...getallpins[i].toObject(),
          owners :ownersWithDetails,
          municipality:getmunicipalityUserDetails,
          countyInfo:getcountUserDetails,
          ConversationAuthority:getConversationAuthorityUserDetails
      }
      array.push(object)
       // getallpins[i]["allOwners"] = ownersWithDetail
        //console.log(getallpins[i],"$$$$$$$$$$$$$$$$$$$$$$$$$$");
     }
     //console.log(getallpins,"+++++++++++++++++++++++++++++++");
     return array;
       }
   else{
       switch (role) {
         case "INDIVIDUAL":

         let getindividualData=await getallindividuauserpins(id,role);
           return getindividualData;
           break;
           case "COUNTY":
            let getcountyData=await getCountyUserPins(id,role);
              return getcountyData;
              break;
            case "CONSERVATIONAUTHORITY":
              let getConversationauthoritydata=await getConversationAuthorityUserPins(id,role);
              return getConversationauthorityda;
              break;
              case "MUNICIPALITY":
                let getMunicipalitydata=await getMunicipalityUserData(id,role);
                return getMunicipalitydata;
                break;
                case "LAWYER":
                let getallpinsbyLower=await getallLowerPins(id,role)
                return getallpinsbyLower;
                break;
               case "INSURER":
                let getinsurerpins=await getallinsurerpins(id,role);
                return getinsurerpins;
                break;
               case "LENDER":
                let getallLenderpins=await getalllenderpins(id,role);
                return getallLenderpins
                 break;
               case "ENGINEER":
                let getengineerpins=await getAllEngineerPins(id,role)
                return getengineerpins
         default:
           break;
       }
   }
  }
  catch(err){
   return err
  }
}
async function getAllEngineerPins(id, role){
  try{
     if(role=="ENGINEER"){
      let array =[];
        let getpin=await pinDetails.find({engineer:id});
        if(getpin.length>0){
          for (let i= 0; i< getpin.length; i++) {
            //console.log(getpin[i])
            let ownersWithDetails = [];
            let municipalityId=getpin[i].municipality;
            let getMunicipalityDetails=await stakeholders.findOne({_id:municipalityId})
            let countyId=getpin[i].pinInfo.county;
            let getcountyDetails=await stakeholders.findOne({_id:countyId})
            let conversationAuthorityId=getpin[i].pinInfo.conservationAuthority;
            let getConversationAuthorityUserData=await stakeholders.findOne({_id:conversationAuthorityId})
            let lowerid=getpin[i].lower;
            let getlowerDetails=await stakeholders.findOne({_id:lowerid});
           let engineerId=getpin[i].engineer;
           let getEngineerDetails=await stakeholders.findOne({_id:engineerId});
           let insurerId=getpin[i].insurer;
           let getInsurerDetails=await stakeholders.findOne({_id:insurerId});
           let lenderID=getpin[i].lender;
           let getLenderDetails=await stakeholders.findOne({_id:lenderID})
          for (let j= 0; j< getpin[i].owners.length; j++) {
            let ownerid=getpin[i].owners[j].ownerID;
            let ownerDetails=await stakeholders.findOne({_id:ownerid});
          //console.log(ownerDetails,"allowner details")
            ownersWithDetails.push(ownerDetails);
          }   
          let ownerObject = {
            ...getpin[i].toObject(),
            owners :ownersWithDetails,
            county:getcountyDetails,
            municipality:getMunicipalityDetails,
           conservationAuthority:getConversationAuthorityUserData,
           lower:getlowerDetails !=null ? getlowerDetails:'',
           engineer:getEngineerDetails !=null ? getEngineerDetails:'',
           insurer:getInsurerDetails !=null ? getinsurerDetails :'',
           lender:getLenderDetails !== null ? getLenderDetails : '',
        }
        array.push(ownerObject) 
          
        }
        return array
        }
        else{
          console.log("engineer@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ functionalities")
          return ({message:"no pins"})
        }
        
     }
  }
  catch(err){
    return err
  }
}
async function getalllenderpins(id, role){
  try{
     if(role=="LENDER"){
      let array =[];
        let getpin=await pinDetails.find({lender:id});
        if(getpin.length>0){
          for (let i= 0; i< getpin.length; i++) {
            //console.log(getpin[i])
            let ownersWithDetails = [];
            let municipalityId=getpin[i].municipality;
            let getMunicipalityDetails=await stakeholders.findOne({_id:municipalityId})
            let countyId=getpin[i].pinInfo.county;
            let getcountyDetails=await stakeholders.findOne({_id:countyId})
            let conversationAuthorityId=getpin[i].pinInfo.conservationAuthority;
            let getConversationAuthorityUserData=await stakeholders.findOne({_id:conversationAuthorityId})
            let lowerid=getpin[i].lower;
            let getlowerDetails=await stakeholders.findOne({_id:lowerid});
           let engineerId=getpin[i].engineer;
           let getEngineerDetails=await stakeholders.findOne({_id:engineerId});
           let insurerId=getpin[i].insurer;
           let getInsurerDetails=await stakeholders.findOne({_id:insurerId});
           let lenderID=getpin[i].lender;
           let getLenderDetails=await stakeholders.findOne({_id:lenderID})
          for (let j= 0; j< getpin[i].owners.length; j++) {
            let ownerid=getpin[i].owners[j].ownerID;
            let ownerDetails=await stakeholders.findOne({_id:ownerid});
          //console.log(ownerDetails,"allowner details")
            ownersWithDetails.push(ownerDetails);
          }   
          let ownerObject = {
            ...getpin[i].toObject(),
            owners :ownersWithDetails,
            county:getcountyDetails,
            municipality:getMunicipalityDetails,
           conservationAuthority:getConversationAuthorityUserData,
           lower:getlowerDetails !=null ? getlowerDetails:'',
           engineer:getEngineerDetails !=null ? getEngineerDetails:'',
           insurer:getInsurerDetails !=null ? getinsurerDetails :'',
           lender:getLenderDetails !== null ? getLenderDetails : '',
        }
        array.push(ownerObject) 
          
        }
        return array
        }
        else{
          console.log("lender functionalities")
          return ({message:"no pins"})
        }
        
     }
  }
  catch(err){
    return err
  }
}
async function getallinsurerpins(id, role){
  try{
    
    if(role=="INSURER"){
      let array=[];
        let ownerpins=await pinDetails.find({insurer:id});
        console.log(ownerpins,"@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        if(ownerpins.length>0){
          for (let i= 0; i<ownerpins.length; i++) {
            let ownersWithDetails = [];
            let municipalityidd=ownerpins[i].municipality;
            let getmunicipalityUserData=await stakeholders.findOne({_id:municipalityidd});
            let countyidd=ownerpins[i].pinInfo.county;
            let getcountyUserData=await stakeholders.findOne({_id:countyidd});
            let conversationid=ownerpins[i].pinInfo.conservationAuthority;
            let getconversationUserData=await stakeholders.findOne({_id:conversationid});
            for (let j= 0; j< ownerpins[i].owners.length; j++) {
                let ownerid=ownerpins[i].owners[j].ownerID;
                let getuserdetails=await stakeholders.findOne({_id:ownerid});
                ownersWithDetails.push(getuserdetails);
            }
            let arrayobject = {
              ...ownerpins[i].toObject(),
              owners :ownersWithDetails,
              municipality:getmunicipalityUserData,
              county:getcountyUserData,
              conversationAuthority:getconversationUserData
           }
           array.push(arrayobject);
           
          }
         
          return array;
        }
        else{
          return ({message:"no pins"})
        }
       

      }
  }
  catch(err){
    return err
  }
}

async function getallindividuauserpins(id, role){
  try{
    
    if(role=="INDIVIDUAL"){
      let array=[];
        let ownerpins=await pinDetails.find({"owners.ownerID":id});
        if(ownerpins.length>0){
          for (let i= 0; i<ownerpins.length; i++) {
            let ownersWithDetails = [];
            let municipalityidd=ownerpins[i].municipality;
            let getmunicipalityUserData=await stakeholders.findOne({_id:municipalityidd});
            let countyidd=ownerpins[i].pinInfo.county;
            let getcountyUserData=await stakeholders.findOne({_id:countyidd});
            let conversationid=ownerpins[i].pinInfo.conservationAuthority;
            let getconversationUserData=await stakeholders.findOne({_id:conversationid});
            for (let j= 0; j< ownerpins[i].owners.length; j++) {
                let ownerid=ownerpins[i].owners[j].ownerID;
                let getuserdetails=await stakeholders.findOne({_id:ownerid},{_id:1,role:1,emailID:1,firstName:1,lastName:1,phoneNumber:1,address:1});
                ownersWithDetails.push(getuserdetails);
            }
            let arrayobject = {
              ...ownerpins[i].toObject(),
              owners :ownersWithDetails,
              municipality:getmunicipalityUserData,
              county:getcountyUserData,
              conversationAuthority:getconversationUserData
           }
           array.push(arrayobject);
           
          }
         
          return array;
        }
        else{
          return ({message:"no pins"})
        }
        

      }
  }
  catch(err){
    return err
  }
}
async function getCountyUserPins(id, role){
  try{
      if(role=="COUNTY"){
        let array=[];
        let getAllpins=await pinDetails.find({"pinInfo.county":id});
        for (let i= 0; i< getAllpins.length; i++) {
          let ownersWithDetails = [];
         // console.log(getAllpins[i],"single Pin")
          let municipalityId=getAllpins[i].municipality;
          let getmunicipalityuserdetails=await stakeholders.findOne({_id:municipalityId});
          let conversationId=getAllpins[i].pinInfo.conservationAuthority;
          let getconversationAuthorityUserData=await stakeholders.findOne({_id:conversationId});
          console.log(municipalityId,"municipality id")
           for (let j= 0; j< getAllpins[i].owners.length; j++) {
               let ownerid= getAllpins[i].owners[j].ownerID;
               let getownerdetails=await stakeholders.findOne({_id:ownerid}) 
               ownersWithDetails.push(getownerdetails);
           }
           let ownerObjects = {
            ...getAllpins[i].toObject(),
            owners :ownersWithDetails ,
            municipality:getmunicipalityuserdetails,
            conversationAuthority:getconversationAuthorityUserData
         }
         array.push(ownerObjects);
         //console.log(array);
        }
        return array;

      }
  }
  catch(err){
    return err
  }
}
async function getMunicipalityUserData(id, role){
  try{
     if(role=="MUNICIPALITY"){
      let array =[];
        let getpin=await pinDetails.find({municipality:id});
        for (let i= 0; i< getpin.length; i++) {
            //console.log(getpin[i])
            let ownersWithDetails = [];
            let countyId=getpin[i].pinInfo.county;
            let getcountyDetails=await stakeholders.findOne({_id:countyId})
            let conversationAuthorityId=getpin[i].pinInfo.conservationAuthority;
            let getConversationAuthorityUserData=await stakeholders.findOne({_id:conversationAuthorityId})
            let lowerid=getpin[i].lower;
            let getlowerDetails=await stakeholders.findOne({_id:lowerid});
           let engineerId=getpin[i].engineer;
           let getEngineerDetails=await stakeholders.findOne({_id:engineerId});
           let insurerId=getpin[i].insurer;
           let getInsurerDetails=await stakeholders.findOne({_id:insurerId});
           let lenderID=getpin[i].lender;
           let getLenderDetails=await stakeholders.findOne({_id:lenderID})
          for (let j= 0; j< getpin[i].owners.length; j++) {
            let ownerid=getpin[i].owners[j].ownerID;
            let ownerDetails=await stakeholders.findOne({_id:ownerid});
          //console.log(ownerDetails,"allowner details")
            ownersWithDetails.push(ownerDetails);
          }   
          let ownerObject = {
            ...getpin[i].toObject(),
            owners :ownersWithDetails,
            county:getcountyDetails,
           conservationAuthority:getConversationAuthorityUserData,
           lower:getlowerDetails !=null ? getlowerDetails:'',
           engineer:getEngineerDetails !=null ? getEngineerDetails:'',
           insurer:getInsurerDetails !=null ? getinsurerDetails :'',
           lender:getLenderDetails !== null ? getLenderDetails : '',
        }
        array.push(ownerObject) 
          
        }
        return array
     }
  }
  catch(err){
    return err
  }
}
async function getallLowerPins(id ,role){
  try{
       if(role=="LAWYER"){
        let array=[];
        let getLowerpins=await pinDetails.find({lower:id});
        if(getLowerpins.length>0){
           for (let i= 0; i< getLowerpins.length; i++) {
            let municipaid=getlowerpins[i].municipality;
            let getAllmunicipalityDetails=await stakeholders.findOne({_id:municipaid});
            let lowerid=getlowerpins[i].lower;
            let getlowerDetails=await stakeholders.findOne(({_id:lowerid}))
            let lenderid=getlowerpins[i].lender;
            let getlenderdetails=await stakeholders.findOne({_id:lenderid});
            let engineerid=getlowerpins[i].engineer;
            let getengineerDetails=await stakeholders.findOne({_id:engineerid});
            let insurerid=getlowerpins[i].ensurer;
            let getinsurerDetails=await stakeholders.findOne({_id:insurerid});
            let countyid=getlowerpins[i].pinInfo.county;
            let getcountyDetails=await stakeholders.findOne({_id:countyid});
            let getConversationId=getlowerpins[i].pinInfo.conservationAuthority;
            let getconversationauthorityDetails=await stakeholders.findOne({_id:getConversationId});
            let allwonersWithDetails=[];
                for (let j= 0; j< getlowerpins.owners.length; index++) {
                   
                  let ownerid=getlowerpins[i].owners[i].ownerID;
                  let getownerdetails=await stakeholders.findOne({_id:ownerid});
                  allwonersWithDetails.push(getownerdetails);
                } 
                let ownerObject={
                ...getlowerpins[i].toObject(),
                 owners :allwonersWithDetails,
                 municipality:getAllmunicipalityDetails,
                 lender:getlenderdetails,
                 lower:getlowerDetails,
                 engineer:getengineerDetails,
                 insurer:getinsurerDetails,
                 countyDetails:getcountyDetails,
                 conversationAuthorityDetails:getconversationauthorityDetails
                }
                array.push(ownerObject);
           }
          return array
        }
       
        else{
          return ({message:"no pins"})
        }
       }
  }
  catch(err){

  }
}
async function getConversationAuthorityUserPins(id,role){
  try{
    if(role=="CONSERVATIONAUTHORITY"){
      let array=[];
      let getAllpins=await pinDetails.find({"pinInfo.conservationAuthority":id});
      for (let i= 0; i< getAllpins.length; i++) {
        let ownersWithDetails = [];
        let lowerid=getAllpins[i].lower;
            let getlowerDetails=await stakeholders.findOne(({_id:lowerid}))
            let lenderid=getAllpins[i].lender;
            let getlenderdetails=await stakeholders.findOne({_id:lenderid});
            let engineerid=getAllpins[i].engineer;
            let getengineerDetails=await stakeholders.findOne({_id:engineerid});
            let insurerid=getAllpins[i].ensurer;
            let getinsurerDetails=await stakeholders.findOne({_id:insurerid});
       // console.log(getAllpins[i],"single Pin")
        let municipalityId=getAllpins[i].municipality;
        let getmunicipalityuserdetails=await stakeholders.findOne({_id:municipalityId});
        let contyid=getAllpins[i].pinInfo.county;
        let getconversationAuthorityUserData=await stakeholders.findOne({_id:contyid});
        //console.log(municipalityId,"municipality id")
         for (let j= 0; j< getAllpins[i].owners.length; j++) {
             let ownerid= getAllpins[i].owners[j].ownerID;
             let getownerdetails=await stakeholders.findOne({_id:ownerid}) 
             ownersWithDetails.push(getownerdetails);
         }
         let ownerObjects = {
          ...getAllpins[i].toObject(),
          owners :ownersWithDetails ,
          municipality:getmunicipalityuserdetails,
          county:getconversationAuthorityUserData,
          lower:getlowerDetails,
          lender:getlenderdetails,
          engineer:getengineerDetails,
          insurer:getinsurerDetails,
       }
       array.push(ownerObjects);
        console.log(array);
      }
      return array;

    }
}
catch(err){
  return err

 }
}


async function fcnassignUsersTopin(data,userid,userrole,pinNumber){
  try {
       //let userRole=await stakeholders.findOne({_id:userid},{role:1});
        if(userrole=="ENGINEER"){
          getPinDetails=await pinDetails.findOne({pin:pinNumber});
          getPinDetails.engineer=data
          await getPinDetails.save();
        }
        
  } catch (error) {
    return error
  }
}
exports.alladdpinFunctions={
  fcnaddPin:fcnaddPin,
  fcngetAllPins:fcngetAllPins,
  fcnGetAllPInsByUserWise:fcnGetAllPInsByUserWise,
 fcnassignUsersTopin:fcnassignUsersTopin
}