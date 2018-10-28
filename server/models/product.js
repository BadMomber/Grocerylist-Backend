/** Package imports */
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	name: {
		type: String,
		required: 'Enter a product name.'
	},
	beschreibung: {
		type: String,
		required: 'Enter a product description or additional information.'
	},
	menge: {
		type: Number,
		required: 'Enter the amount you want.'
	},
	einheit: {
		type: String,
		required: 'Enter the products common unit.'
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: null
	},
	gekauft: {
		type: Boolean,
		default: false
	},
	isbn: {
		type: String,
		required: false,
		default: null
	},
	preis: {
		type: String,
		required: false
	}
});

module.exports = ProductSchema;
