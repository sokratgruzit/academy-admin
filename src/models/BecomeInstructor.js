const {Schema, model, mongoose} = require('mongoose');


const schema = new Schema({
   name:{
		type: String,
		default: 'become_instructor'
	},
   title: {
		type: String,
		unique: true, 
	},
   advantages: {
      type: Array, 
      default: [
         {
            title: String,
            teaser: String
         }
      ]
   }, 
   steps: {
      type: Array,
      default: [
         {
            title: String,
            teaser: String
         }
      ]
   },
   additional_info: {
      type: Object,
      default: {
         title: String,
         teaser: String,
         link: {
            name: String,
            url: String
         }
      }
   } 
},{
	timestamps: true
})

module.exports = model('BecomeInstructor', schema);