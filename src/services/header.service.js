const Header = require('../models/Header');

async function index(){
   const result = await Header.find();
   return {result};
}

async function findOne(slug){
   const result = await Header.findOne({slug}); 
   return {result};
} 

async function create(body) {
   let result = new Header(body);
   result = await result.save();
   return {result};
}

async function update(slug, body){
   const result = await Header.findOne({slug});
   await result.updateOne(body);

   return {
      message: 'Header successuly updated'
   }
}

async function destroy(slug){
   await Header.deleteOne({ slug});
    
   return {
      message: 'Header successuly deleted'
   }
}


module.exports = {
   create,
   index,
   findOne,
   update,
   destroy
}