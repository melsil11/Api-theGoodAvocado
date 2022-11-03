/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
const mongoose = require('mongoose')
const reviewSchema = require('./review')

// create the schema
const restaurantSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true
		},
		telephone: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true,
		},
		otherTypes: {
			type: String,
			required: false,
		},
		isUserRestaurantOwner: {
			type: Boolean,
			default: false
		},
		delivery: {
			type: Boolean,
			default: false
		},
		reservations: {
			type: Boolean,
			default: false
		},
		takeout: {
			type: Boolean,
			default: false
		},
		catering: {
			type: Boolean,
			default: false
		},
		acceptsCreditCard: {
			type: Boolean,
			default: false
		},
		parking: {
			type: Boolean,
			default: false
		},
		wifi: {
			type: Boolean,
			default: false
		},
		masksRequired: {
			type: Boolean,
			default: false
		},
		alcohol: {
			type: Boolean,
			default: false
		},
		vegan: {
			type: Boolean,
			default: false
		},
		website: {
			type: String,
			required: false
		},
	

		reviews: [reviewSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
	}
)

//////////////////////////////////////////////
// Create and Export Model
//////////////////////////////////////////////
module.exports = mongoose.model('Restaurant', restaurantSchema)
