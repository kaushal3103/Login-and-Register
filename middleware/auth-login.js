const connectDB = require('../db/connect');
require('dotenv').config();

const Login = require('../models/tasks');
const bcrypt = require('bcryptjs');
const {BadRequest,CustomAPIError} = require('../errors');

const check = async(req,res,next)=>{

     const {username,password} = req.body;

         if( !username || !password)
         {
        throw new BadRequest('Please provide username/password');
         }

    try{

        await connectDB(process.env.MONGO_URI);
       
        const user = await Login.findOne({username}).lean();

        if(!user){
             throw new BadRequest('invalid username');
        }
        
      if(await bcrypt.compare(password,user.Password))
      {
           id=user._id;
           req.body ={id,username,password};

           next();
        
      }else{
           throw new BadRequest('incorrect password');
      }
           
    }catch(error){
           
           if(error.message.includes('invalid username')){
                 throw new BadRequest('Please enter valid username/password');

           }else if(error.message.includes('incorrect password')){
                 throw new BadRequest('Password is Incorrect');

           }else if(error.message.includes('username/password is empty')){
                 throw new BadRequest('Please provide username/password');

           }else{
                throw new CustomAPIError('Something went wrong !');
           }      
    }
}

module.exports = check;