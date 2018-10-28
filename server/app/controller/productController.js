/** Package imports */
const productSchema = require('../../models/product');
const mongoose = require('mongoose');
const mongoose_csv = require('mongoose-csv');
const PriceWriter = require('./middleware/priceWriter');


productSchema.plugin(mongoose_csv);
const Product = mongoose.model('Product', productSchema);

class productController {

	constructor() {};

	async addNewProduct(req, res) {
        if(req.body.isbn != null) {
            console.log("Produkt hat GTIN, suche nach Preis startet...");
            const priceWriter = new PriceWriter();
            priceWriter.updatePrice(req.body, res)
        }

        else {
            let newProduct = new Product(req.body);
            newProduct.save((err, product) => {
                if (err) {
                    res.status(422).send(err);
                }
                res.status(200).json(product);
            });
		}

	}

	// GET all products
	getProducts(req, res) {
		Product.find({}, (err, product) => {
			if (err) {
				res.status(422).send(err);
			}
			res.status(200).json(product);
		});
	}

	// GET single product by id
	getProductWithID(req, res) {
		Product.findById(req.params.productId, (err, product) => {
			if (err) {
				res.status(422).send(err);
			}
			res.status(200).json(product);
		});
	}

	// UPDATE single product with PUT
    updateProduct(req, res) {
        Product.findOneAndUpdate({
                _id: req.params.productId
            },
            req.body, {
                new: true,
                runValidators: true
            },
            (err, product) => {
                if (err) {
                    res.status(422).send(err);
                }
                res.status(200).json(product);
            }
        );
    }

	// DELETE single product by id
	deleteProduct(req, res) {
		Product.remove({
			_id: req.params.productId
		}, (err, product) => {
			if (err) {
				res.status(422).send(err);
			}
			res.status(200).json({
				message: 'Successfully deleted product!'
			});
		});
	}


	// Download all products on list as CSV
	getAllProductsAsCSV(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename=sample.csv'
        });
        // pipe file using mongoose-csv
        Product.find().limit(100).csv(res);
    }

    writePrice(productId, price,) {

        Product.findOneAndUpdate({
                _id: productId
            },
            price, {
                new: true,
                runValidators: true
            },
            (err) => {
                if (err) {
                    console.log("Fehler beim Preis schreiben: " + err);
                }
                console.log("Preis erfolgreich geschrieben");
            }
        );
	};

    // UPDATE single product with PUT
    updateProduct(req, res) {
        Product.findOneAndUpdate({
                _id: req.params.productId
            },
            req.body, {
                new: true,
                runValidators: true
            },
            (err, product) => {
                if (err) {
                    res.status(422).send(err);
                }
                res.status(200).json(product);
            }
        );
    }
}

module.exports = productController;
