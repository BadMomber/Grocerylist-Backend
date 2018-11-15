/** Package imports */
const express = require ('express');
const router = express.Router ({mergeParams: true});

/** File imports */
const asyncWrapper = require ('./middleware/asyncWrapper');
const PriceWriter = require ('./middleware/priceWriter');
const Product = require ('../../models/product');
const escape = require ('./middleware/escapeHTML');

/** Routes */
router.get ('/', getProducts);
router.get ('/csv', getAllProductsAsCSV);
router.get ('/:id', getProductWithID);
router.delete ('/:id', deleteProduct);
router.put ('/:id', updateProduct);
router.post ('/', asyncWrapper (addNewProduct));

/**
 * Add a new product
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function addNewProduct(req, res) {
  const combinedString = (
    req.body.name
    + req.body.description
    + req.body.unit
    + req.body.gtin).toString ();
  if (await escape (combinedString) === false) {
    res.status (422).send ({
      status: 'DECLINED',
      data: ' HTML special characters < > & are not allowed in user editable string fields (name, description, unit,' +
        ' gtin)'
    });
  } else {
    if (req.body.gtin != null && req.body.gtin.length === 13) {
      try {
        console.log ("Valid GTIN detected, searching for best price on Google Shopping...");
        const priceWriter = new PriceWriter ();
        priceWriter.updatePrice (req.body, res);
      } catch (e) {
        res.status (500).send (e);
      }
    }
    else if (req.body.gtin != null && req.body.gtin.length < 13) {
      try {
        console.log ("Invalid GTIN detected, saving product without price...");
        const newProduct = new Product (req.body);
        newProduct.gtin = req.body.gtin + " (invalid)";
        const createdProduct = await newProduct.save ();
        res.status (201).send ({
          status: 'CREATED',
          data: createdProduct
        })
      } catch (e) {
        res.status (500).send (e);
      }
    }
    else {
      try {
        const newProduct = new Product (req.body);
        const createdProduct = await newProduct.save ();
        res.status (201).send ({
          status: 'CREATED',
          data: createdProduct
        })
      } catch (e) {
        res.status (500).send (e);
      }
    }
  }
}

/**
 * Get all products from list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getProducts(req, res) {
  try {
    const product = await Product.find ({});
    res.status (200).send ({
      status: 'OK',
      data: product
    });
  } catch (e) {
    res.status (500).send (e);
  }
}

/**
 * Get a single product from list
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getProductWithID(req, res) {
  try {
    const product = await Product.findById (req.params.id);
    res.status (200).send ({
      status: 'OK',
      data: product
    });
  } catch (e) {
    res.status (500).send (e);
  }
}

/**
 * Update a product with given id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = await Product.findOneAndUpdate ({
      _id: productId
    }, {
      $set: req.body,
      updated_at: Date.now ()
    }, {
      new: true,
    });
    
    res.status (201).send ({
      status: 'UPDATED',
      data: product
    })
  } catch (e) {
    res.status (500).send (e);
  }
}

/**
 * Delete a single product with given id
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function deleteProduct(req, res) {
  try {
    await Product.findOneAndDelete (req.params.id);
    res.status (204).send ();
  } catch (e) {
    res.status (500).send (e);
  }
}

/**
 * Export all products on list as CSV
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function getAllProductsAsCSV(req, res) {
  try {
    res.writeHead (200, {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename=groceryList.csv'
    });
    // pipe file using mongoose-csv
    Product.find ().csv (res);
  } catch (e) {
    res.status (500).send (e);
  }
}

module.exports = {
  router
};