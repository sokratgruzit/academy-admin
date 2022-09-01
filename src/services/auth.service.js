
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

async function register(email, password) {

   const candidate = await User.findOne({ email });

   if (candidate) {
      return {
         status: 400,
         message: 'User exists'
      }
   }

   const hashedPassword = await bcrypt.hash(password, 12);
   const user = new User({ email, password: hashedPassword });
   await user.save();

   return {
      status: 200,
      message: 'User created'
   };
}

async function login(email, password) {

   const user = await User.findOne({ email });

   if (!user) { 
      return {
         status: 400,
         message: 'User not found'
      }
   }

   const isMatch = await bcrypt.compare(password, user.password)

   if (!isMatch) {
      return {
         status: 400,
         message: 'Wrong password, please try again'
      }
   }

   const token = jwt.sign(
      { userId: user.id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
   )

   return { 
      status: 200,
      token, 
      userId: user.id 
   }
} 

module.exports = {
   register,
   login
}