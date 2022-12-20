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
	},
	description: {
		type: String
	},
   duration: {
		type: String
	},
   category: { type: Schema.Types.ObjectId, ref: 'Category' },
   level: { type: Schema.Types.ObjectId, ref: 'Level' },
	question: {
		type: String
	},
	structure: {
		type: Array,
		default: [{
			title: String,
			question: { type: Schema.Types.ObjectId, ref: 'QuestionBank' },
		}]
	},
   editor: {
      type: String
   }
},{
	timestamps: true
})

module.exports = model('Quiz', schema);