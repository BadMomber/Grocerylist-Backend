/** Package imports */
const ProductController = require('../controller/productController');
// const asyncWrapper = require('../controller/middleware/asyncWrapper');

module.exports = function (app) {

	// POST method for product
	const productController = new ProductController();
	app.route('/products').post(productController.addNewProduct);

	// GET method for ALL products
	app.route('/products').get(productController.getProducts);

	// GET a specific product by id
	app.route('/products/:productId')
		.get(productController.getProductWithID)
		// UPDATE a specific product
		.put(productController.updateProduct)
		// DELETE a specific object
		.delete(productController.deleteProduct);

	// Download all products on list as CSV
	app.route('/csv').get(productController.getAllProductsAsCSV);

	// Download single Product as CSV
    // app.route('/products/:productId/csv');
	// Download search-results as CSV (if there are any)
};
