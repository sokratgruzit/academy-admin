const {Schema, model, mongoose} = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongoosePaginate = require('mongoose-paginate');

mongoose.plugin(slug); 
mongoose.plugin(mongoosePaginate);

const schema = new Schema({
   title: {
		type: String,
		required: [true, 'Title is required'],
	}, 
	to: {  
		type: String, 
		unique: true 
	},
	tag: {
		type: String
	},
	ord:Number,
	subLinks:[]
}, {
	timestamps: true
});

module.exports = model('Menu', schema);