const {Schema, model, mongoose} = require('mongoose');
const slug = require('mongoose-slug-updater');
const mongoosePaginate = require('mongoose-paginate');

mongoose.plugin(slug); 
mongoose.plugin(mongoosePaginate);

const schema = new Schema({
   title: {
		type: String,
		unique: true, 
		required: [true, 'Title is required'],
	}, 
	slug: {  
		type: String, 
		slug: "title", 
		slugPaddingSize: 2,  
		unique: true 
	},
	editor: {
		type: String
	},
	duration: {
		type: String
	},
	image: Object,
	category: { type: Schema.Types.ObjectId, ref: 'Category' },
	language: { type: Schema.Types.ObjectId, ref: 'Language' },
	level: { type: Schema.Types.ObjectId, ref: 'Level' },
	tag: [{ type: Schema.Types.ObjectId, ref: 'Tag' }]
}, {
	timestamps: true
});

module.exports = model('Article', schema);