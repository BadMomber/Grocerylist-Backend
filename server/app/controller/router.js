/** Package imports */
const express = require ('express');
const router = express.Router ();

/** File imports */
const productController = require ('./productController');
const logTime = require ('./middleware/timeLog');

/** Routes */
router.use ('/products', logTime, productController.router);

/** Exports */
module.exports = {router};
