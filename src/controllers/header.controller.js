const header = require('../services/header.service');

async function index(req, res) {
   try {
      const result = await header.index();
      res.status(200).json(result);
   } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message });
   }
} 

async function findOne(req, res){ 
   try{ 
      let result = await header.findOne(req.params.slug);
      res.status(200).json(result);
   }catch(e){ 
      console.log(e.message);
      res.status(400).json({ message: e.message }); 
   }
}

async function create(req, res) {
   try {
      const result = await header.create(req.body);
      res.status(200).json(result);
   } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message })
   }
}

async function update(req, res) {
   try {
      const result = await header.update(req.params.slug, req.body);
      res.status(201).json(result);
   } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message })
   }

} 
 
async function destroy(req, res){
   try{
      const result = await header.destroy(req.params.slug);
      res.status(200).json(result)
   }catch(e){
      console.log(e.message);
      res.status(400).json({ message: e.message })
   }
}

module.exports = {
   create, 
   index,
   findOne,
   update,
   destroy
}