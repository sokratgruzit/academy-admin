const Article = require('../models/Article');



async function index(){
   const result = await Article.find().populate(['category', 'level', 'tag']);
   return {result};
}

async function findOne(id){
   const result = await Article.findById(id); 
   return {result};
} 

async function create(body) {
   let result = new Article(body);
   result = await result.save();
   return {result};
}


async function update(id, body){
   const result = await Article.findById(id);
   await result.updateOne(body);

   return {
      message: 'Article successuly updated'
   }
}

async function destroy(id){
   await Article.deleteOne({ _id: id });
    
   return {
      message: 'Article successuly deleted'
   }
}


module.exports = {
   create,
   index,
   findOne,
   update,
   destroy
}