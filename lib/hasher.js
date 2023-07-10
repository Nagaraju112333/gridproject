const bcrypt=require('bcrypt');
const CONFIG=require('../loaders/ dotenv')
async function passwordHasher(password){
try{
     return await bcrypt.hash(password,parseInt(CONFIG.BYCRYPT_SALT_ROUNDS))
   } 
   catch(err){
    return err
   }
}

async function comparePassword(password,hash){
    try
    {
       return await bcrypt.compare(password.hash);
    }
    catch(err)
    {
        return err
    }
}
exports.hasher={
    passwordHasher:passwordHasher,
    comparePassword:comparePassword
}
