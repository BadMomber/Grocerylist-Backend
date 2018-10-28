/** Package imports */
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();

/** File imports */
const server = require('../server');
const beerModel = require('../models/product');

/** chai.js plugins */
chai.use(chaiHttp);

/** Tests */
describe('Product', () => {

	// Clear the database before each run in this block
	beforeEach(done => {
		beerModel.deleteMany({}, () => {
			done();
		});
	});


	// Test the /GET route
	describe('/GET product', () => {
		// GET product should return an empty array
		it('should GET all the beers (empty)', (done) => {
			chai
				.request(server)
				.get('/api/product')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.include.key('data');
					res.body.data.should.be.a('array');
					res.body.data.length.should.be.eql(0);
					done();
				});
		});
	});

	// Test the /DELETE route
	describe('/DELETE product/:id', () => {
		it('it should DELETE a product given the id', (done) => {

			/** Create product model */
			const product = new beerModel({
				name: 'Becks Ice',
				price: 0.99,
				description: 'Icecold. Taste and feel it'
			});
			/** Save product and test it */
			product.save((err, product) => {
				chai
					.request(server)
					.delete('/api/product/' + product.id)
					.end((err, res) => {
						res.should.have.status(204);
						done();
					});
			});
		});
	});

	/**
	 * Test /GET/:id route
	 */
	describe('/GET product/:id ', () => {
		it('it should GET a product by the given id', (done) => {
			/** Create product model */
			const product = new beerModel({
				name: 'Becks Ice',
				price: 0.99,
				description: 'Icecold. Taste and feel it'
			});

			product.save((err, product) => {
				chai
					.request(server)
					.get('/api/product/' + product.id)
					.send(product)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.include.key('data');
						res.body.data.should.be.a('object');
						res.body.data.should.have.property('name');
						res.body.data.should.have.property('price');
						res.body.data.should.have.property('description');
						res.body.data.should.have.property('_id').eql(product.id);
						done();
					});
			});
		});
	});

	/**
	 * Test create beers
	 */
	describe('/POST product', () => {
		// Functional test
		it('it should POST a correct product', (done) => {
			/** Create product model */
			const product = new beerModel({
				name: 'Becks Ice',
				price: 0.99,
				description: 'Icecold. Taste and feel it'
			});

			chai.request(server)
				.post('/api/product')
				.send(product)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.include.key('data');
					res.body.data.should.be.a('object');
					res.body.data.should.have.property('name');
					res.body.data.should.have.property('price');
					res.body.data.should.have.property('description');
					done();
				});
		});
	});

	// Non working tests to make sure beers have required fields
	it('should not POST a product without name field', (done) => {
		const product = {};
		chai.request(server)
			.post('/api/product')
			.send(product)
			.end((err, res) => {
				res.should.have.status(400);
				res.body.should.be.a('object');
				res.body.should.have.property('errors');
				res.body.errors.should.have.property('price');
				res.body.errors.should.have.property('name');
				res.body.errors.price.should.have.property('kind').eql('required');
				res.body.errors.name.should.have.property('kind').eql('required');
				done();
			});
	});
});
