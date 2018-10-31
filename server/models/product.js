/** Package imports */
const mongoose = require ('mongoose');
const mongoose_csv = require('mongoose-csv');

/** Initialize Schema */
const Schema = mongoose.Schema;

/** Setup Schema */
const productSchema = new Schema ({
	name: {
		type: String,
		required: 'Enter a product name.'
	},
	description: {
		type: String,
		required: 'Enter a product description or additional information.'
	},
	amount: {
		type: Number,
		required: 'Enter the amount you want.'
	},
	unit: {
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
	purchased: {
		type: Boolean,
		default: false
	},
	gtin: {
		type: String,
		required: false,
		default: null
	},
	price: {
		type: String,
		required: false
	}
});

/** Write CSV export plugin on schema */
productSchema.plugin(mongoose_csv);

module.exports = mongoose.model('Product', productSchema);
