const page = require('../services/page.services');

async function index(req, res) {
   try {
      const result = await page.index();
      res.status(200).json(result);
   } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message });
   }
} 

async function findOne(req, res){ 
   try{ 
      let result = await page.findOne(req.params.slug);
      res.status(200).json(result);
   }catch(e){ 
      console.log(e.message);
      res.status(400).json({ message: e.message }); 
   }
}

async function create(req, res) {
   try {
      const result = await page.create(req.body);
      res.status(200).json(result);
   } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message })
   }
}

async function update(req, res) {
   try {
      const result = await page.update(req.params.slug, req.body);
      res.status(201).json(result);
   } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: e.message })
   }

} 
 
async function destroy(req, res){
   try{
      const result = await page.destroy(req.params.slug);
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