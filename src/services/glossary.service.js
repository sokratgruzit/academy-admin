const Glossary = require('../models/Glossary');



async function index(){
   const result = await Glossary.find();
   return {result};
}

async function findOne(slug){
   const result = await Glossary.findOne({slug}); 
   return {result};
} 

async function create(body) {
   let result = new Glossary(body);
   result = await result.save();
   return {result};
}


async function update(slug, body){
   const result = await Glossary.findOne({slug});
   await result.updateOne(body);

   return {
      message: 'Glossary successuly updated'
   }
}

async function destroy(slug){
   await Glossary.deleteOne({ slug});
    
   return {
      message: 'Glossary successuly deleted'
   }
}


module.exports = {
   create,
   index,
   findOne,
   update,
   destroy
}