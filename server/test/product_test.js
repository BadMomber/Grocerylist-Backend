/** Package imports */
const chai = require ('chai');
const chaiHttp = require ('chai-http');
const mongoose = require('mongoose');
const should = chai.should();


/** File imports */
const server = require ('../server');
const Product = require ('../models/product');

/** chai.js plugins */
chai.use (chaiHttp);

/** Tests */
describe ('Product', () => {
  
  // Clear the database before each run in this block
  beforeEach (done => {
    Product.deleteMany ({}, () => {
      done ();
    });
  });
  
  
  // Test the /GET route
  describe ('/GET products', () => {
    // GET product should return an empty array
    it ('should GET all the products (empty)', (done) => {
      chai
        .request (server)
        .get ('/api/products')
        .end ((err, res) => {
          res.should.have.status (200);
          res.body.should.include.key ('data');
          res.body.data.should.be.a ('array');
          res.body.data.length.should.be.eql (0);
          done ();
        });
    });
  });
  
  // Test the /DELETE route
  describe ('/DELETE products/:id', () => {
    it ('it should DELETE a product given the id', (done) => {
      
      /** Create product model */
      const product = new Product ({
        name: 'Butter',
        description: 'no low fat',
        amount: '0.25',
        unit: 'kilo',
      });
      /** Save product and test it */
      product.save ((err, product) => {
        chai
          .request (server)
          .delete ('/api/products/' + product._id)
          .end ((err, res) => {
            res.should.have.status (204);
            done ();
          });
      });
    });
  });
  
  /**
   * Test /GET/:id route
   */
  describe ('/GET products/:id ', () => {
    it ('it should GET a product by the given id', (done) => {
      /** Create product model */
      const product = new Product ({
        name: 'Water',
        description: 'sparkling',
        amount: '12',
        unit: 'bottles',
      });
      
      product.save ((err, product) => {
        chai
          .request (server)
          .get ('/api/products/' + product._id)
          .send (product)
          .end ((err, res) => {
            res.should.have.status (200);
            res.body.should.include.key ('data');
            res.body.data.should.be.a ('object');
            res.body.data.should.have.property ('name');
            res.body.data.should.have.property ('description');
            res.body.data.should.have.property ('amount');
            res.body.data.should.have.property ('unit');
            res.body.data.should.have.property ('_id').eql (product.id);
            done ();
          });
      });
    });
  });
  
  /**
   * Test create products
   */
  describe ('/POST products', () => {
    // Functional test
    it ('it should POST a correct product', (done) => {
      /** Create product model */
      const product = new Product ({
        name: 'Water',
        description: 'sparkling',
        amount: '12',
        unit: 'bottles',
      });
      
      chai.request (server)
        .post ('/api/products')
        .send (product)
        .end ((err, res) => {
          res.should.have.status (201);
          res.body.should.include.key ('data');
          res.body.data.should.be.a ('object');
          res.body.data.should.have.property ('name');
          res.body.data.should.have.property ('description');
          res.body.data.should.have.property ('amount');
          res.body.data.should.have.property ('unit');
          done ();
        });
    });
  });
  
  describe ('/POST products', () => {
    // Functional test
    it ('it should POST a correct product with detected price', (done) => {
      /** Create product model */
      const product = new Product ({
        name: 'Water',
        description: 'sparkling',
        amount: '12',
        unit: 'bottles',
        gtin: '4000401010284'
      });
      
      chai.request (server)
        .post ('/api/products')
        .send (product)
        .end ((err, res) => {
          res.should.have.status (201);
          res.body.should.include.key ('data');
          res.body.data.should.be.a ('object');
          res.body.data.should.have.property ('name');
          res.body.data.should.have.property ('description');
          res.body.data.should.have.property ('amount');
          res.body.data.should.have.property ('unit');
          res.body.data.should.have.property ('gtin');
          res.body.data.should.have.property ('price');
          done ();
        });
    }).timeout (20000);
  });
  
  // Non working tests to make sure products have required fields
  it ('should not POST a product without name field', (done) => {
    const product = {};
    chai.request (server)
      .post ('/api/products')
      .send (product)
      .end ((err, res) => {
        res.should.have.status (500);
        res.body.should.be.a ('object');
        res.body.should.have.property ('errors');
        res.body.errors.should.have.property ('name');
        res.body.errors.should.have.property ('description');
        res.body.errors.should.have.property ('amount');
        res.body.errors.should.have.property ('unit');
        res.body.errors.name.should.have.property ('kind').eql ('required');
        res.body.errors.description.should.have.property ('kind').eql ('required');
        res.body.errors.amount.should.have.property ('kind').eql ('required');
        res.body.errors.unit.should.have.property ('kind').eql ('required');
        done ();
      });
  });
});
