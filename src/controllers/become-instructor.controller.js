const become_instructor = require('../services/become-instructor.service');

async function index(req, res) {
   try {
      const result = await become_instructor.index();
      res.status(200).json(result);
   } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message });
   }
} 


async function update(req, res) {
   try {
      const result = await become_instructor.update(req.body);
      res.status(201).json(result);
   } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message })
   }

} 


module.exports = {
   index,
   update
}