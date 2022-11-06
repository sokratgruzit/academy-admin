const BecomeInstructor = require('../models/BecomeInstructor');



async function index() {
   let result = await BecomeInstructor.findOne({ name: 'become_instructor' }).exec();
   if (!result) {
      result = new BecomeInstructor();
      await result.save()
   }
   return { result };
}

async function update(body) {
   const filter = { name: 'become_instructor' };
   console.log(body)
   const result = await BecomeInstructor.findOneAndUpdate(filter, body);
   return {
      message: 'Page successuly updated'
   }
}



module.exports = {
   index,
   update
}