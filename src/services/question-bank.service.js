const Question = require('../models/QuestionBank');

async function index(){
   const result = await Question.find();
   return {result};
}

async function findOne(slug){
   const result = await Question.findOne({slug}); 
   return {result};
}    

async function create(body) {
   let result = new Question(body);
   result = await result.save();
   return {result};
}


async function update(slug, body){
   const result = await Question.findOne({slug});
   await result.updateOne(body);

   return {
      message: 'Question successuly updated'
   } 
}

async function destroy(slug){
   await Question.deleteOne({ slug });
    
   return {
      message: 'Question successuly deleted'
   }
}


module.exports = {
   create,
   index,
   findOne,
   update,
   destroy
}