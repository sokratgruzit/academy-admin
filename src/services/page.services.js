const Page = require('../models/Page');



async function index(){
   const result = await Page.find();
   return {result};
}

async function findOne(slug){
   const result = await Page.findOne({slug}); 
   return {result};
} 

async function create(body) {
   let result = new Page(body);
   result = await result.save();
   return {result};
}


async function update(slug, body){
   const result = await Page.findOne({slug});
   await result.updateOne(body);

   return {
      message: 'Page successuly updated'
   }
}

async function destroy(slug){
   await Page.deleteOne({ slug});
    
   return {
      message: 'Page successuly deleted'
   }
}


module.exports = {
   create,
   index,
   findOne,
   update,
   destroy
}