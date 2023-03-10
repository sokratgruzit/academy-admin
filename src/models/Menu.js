const {Schema, model, mongoose} = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongoosePaginate = require('mongoose-paginate');

mongoose.plugin(slug); 
mongoose.plugin(mongoosePaginate);

const schema = new Schema({
   	component: {
		type: String,
		unique: true,
		required: [true, 'Component is required'],
	}, 
	to: {  
		type: String, 
		unique: true,
		required: [true, 'Route is required'],
	},
	path: {
		type: String
	},
	ord:Number,
	active: {type: Boolean, default: false},
	subLinks: []
}, {
	timestamps: true
});

module.exports = model('Menu', schema);