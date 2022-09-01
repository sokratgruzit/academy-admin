

class TaxonomiesService {
	constructor(model) {
		this.Model = require(`../models/${model}`);
	}

	async index() {
		const result = await this.Model.find();
		return result;
	}

	async create(body) {
		const result = new this.Model(body);
		await result.save();
		return result;
	}

	async findOne (id){
		const result = await this.Model.findById(id);
		return {result};
	}

	async update(id, body){
		const result = await this.Model.findById(id);
		await result.updateOne(body);
	
		return {
			message: 'Taxomonies successuly updated'
		}
	}

	async destroy(id){
		await this.Model.deleteOne({ _id: id });
		 
		return {
			message: 'Taxomonies successuly deleted'
		}
	}

} 

module.exports = TaxonomiesService;