/** Package imports */
const GtinController = require('../gtinController.js');
const productSchema = require('../../../models/product');
const mongoose = require('mongoose');
const Product = mongoose.model('Product', productSchema);

//const jobID = "5bd5337e7a4b2b488af4a520";
class priceWriter {
    construtor() {};

    async updatePrice(body, res) {
        let jobIsDone = false;

        const gtinController = new GtinController();
        const jobID = await gtinController.postPriceRequest(body.isbn);

        let watchJob = setInterval(async function () {
            if (jobIsDone === false) {
                jobIsDone = await gtinController.getJobStatus(jobID);
            }

            else {
                let newProduct = new Product(body);
                newProduct.preis = await gtinController.downloadPrice(jobID);
                clearInterval(watchJob);
                newProduct.save((err, product) => {
                    if (err) {
                        res.status(422).send(err);
                    }
                    res.status(200).json(product);
                });
            }
        }, 2000);
    }

    /*

    let watchJob = setInterval(async function () {
            if (jobIsDone === false) {
                i++;
                //console.log("jobIsDone: " + jobIsDone);
                //console.log("setInterval");
                jobIsDone = await gtinController.getJobStatus(jobID);
                //console.log(i);
                if (jobIsDone === true) {
                    i++;
                    price = await gtinController.downloadPrice(jobID)
                    //console.log(price);
                    //console.log(i);
                    clearInterval(watchJob);
                    productController.updateProduct(productId, price);
                    return price;
                }
            } else {
                price = await gtinController.downloadPrice(jobID)
                //console.log(price);
                //console.log(i);
                clearInterval(watchJob);
                productController.writePrice(productId, price);
                return price;
            }
        }, 2000);

     */
}

module.exports = priceWriter;