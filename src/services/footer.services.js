const Footer = require('../models/Footer');



async function index(){
   const result = await Footer.find();
   return {result};
}

async function findOne(slug){
   const result = await Footer.findOne({slug}); 
   return {result};
} 

async function create(body) {
   let result = new Footer(body);
   result = await result.save();
   return {result};
}


async function update(slug, body){
   const result = await Footer.findOne({slug});
   await result.updateOne(body);

   return {
      message: 'Footer successuly updated'
   }
}

async function destroy(slug){
   await Footer.deleteOne({ slug});
    
   return {
      message: 'Footer successuly deleted'
   }
}


module.exports = {
   create,
   index,
   findOne,
   update,
   destroy
}