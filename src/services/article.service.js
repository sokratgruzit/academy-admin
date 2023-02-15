const Article = require('../models/Article');

async function index(category, level, tag, limit, page, id_not, language){
   let query = {};
   let options = {
      populate: ['category', 'level', 'tag', 'language'],
      limit: limit || 10,
      page: page || 1
   };

   category ? query.category = category : '';
   level ? query.level = level : '';
   language ? query.language = language : '';
   tag ? query.tag = { $in : tag} : '';
   id_not ? query._id = {$ne: id_not} : '';
      
   const result = await Article.paginate(query, options);    
   return result;
}

async function findOne(slug){
   const result = await Article.findOne({slug}).populate(['category', 'level', 'tag', 'language']); 
   return {result};
}   

async function create(body) {
   let result = new Article(body);
   result = await result.save();
   return {result};
}

async function update(slug, body){
   const result = await Article.findOne({slug});
   await result.updateOne(body);

   return {
      message: 'Article successuly updated'
   } 
}

async function destroy(slug){
   await Article.deleteOne({ slug });
    
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
};