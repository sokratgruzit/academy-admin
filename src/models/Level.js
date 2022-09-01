const {Schema, model, mongoose} = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug); 

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
	}
},{
	timestamps: true
})

module.exports = model('Level', schema);