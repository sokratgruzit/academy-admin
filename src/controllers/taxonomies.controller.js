const TaxonomiesService = require('../services/taxonomies.service');

class TaxonomiesController {
   constructor(model) {
      this.Services = new TaxonomiesService(model);
      this.create = this.create.bind(this);
      this.index = this.index.bind(this);
      this.findOne = this.findOne.bind(this);
      this.update = this.update.bind(this);
      this.destroy = this.destroy.bind(this);
   } 

   async index (req, res){
      try{
         const result = await this.Services.index();
         res.status(200).json(result);
      }catch(e){
         console.log(e.message);
         res.status(400).json(e.message);
      }
   }

   async findOne(req, res){ 
      try{ 
         let result = await this.Services.findOne(req.params.id);
         res.status(200).json(result);
      }catch(e){ 
         console.log(e.message);
         res.status(400).json({ message: e.message }); 
      }
   }

   async create(req, res) {
      try {
         let result = await this.Services.create(req.body);
         res.status(201).json(result);
      } catch (e) {
         console.log(e.message);
         res.status(400).json(e.message);
      }
   }

   async  update(req, res) {
      try {
         const result = await this.Services.update(req.params.id, req.body);
         res.status(201).json(result);
      } catch (e) {
         console.log(e.message);
         res.status(400).json({ message: e.message })
      }
   
   } 


   async destroy(req, res){
      try{
         const result = await this.Services.destroy(req.params.id);
         res.status(200).json(result)
      }catch(e){
         console.log(e.message);
         res.status(400).json({ message: e.message })
      }
   }
}

module.exports = TaxonomiesController;
