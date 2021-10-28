require('dotenv').config();

const jwt=require('jsonwebtoken');
const connectDB = require('../db/connect');

const Login = require('../models/tasks');
const bcrypt = require('bcryptjs');
const {BadRequest,CustomAPIError} = require('../errors');

const login = async(req,res)=>{

   const {id,username,password} = req.body;
    
   const token =jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'});
        
   res.status(200).json({msg:'Successfully Login ',token});
}

const Register = async(req,res)=>{
    const {username,password} = req.body;

     if( !username || typeof username != 'string' )
     {
        throw new BadRequest('Please provide valid username');
     }

      if( !password || typeof password != 'string' )
     {
        throw new BadRequest('Please provide valid password');
     }


     if ( username.length < 5 || password.length < 5)
     {
         throw new BadRequest('Username/Password should be atleast of 5 letters')
     }

    const Password = await bcrypt.hash(password,10);
    
      try{
         
     await connectDB(process.env.MONGO_URI);
        
     await Login.create({
            username,
            Password
        })
       
        res.status(200).json({msg:'Successfully registered'});

    }
    catch(error){
      
       if(error.message.includes('E11000 duplicate key error collection')){

          throw new BadRequest('Username already existed')
       }
       else{
           
        throw new CustomAPIError('Something went wrong !')       
       }
    }

}

const dashboard = async(req,res)=>{
    
 const luckyNumber = Math.floor(Math.random()*100); 
    res.status(200).json({msg:`Hello, ${req.user.username}`,secret:`Your secret number is ${luckyNumber}`});
    
}

module.exports={
    login,dashboard,Register,
}

