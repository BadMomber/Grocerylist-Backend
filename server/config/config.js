const env = process.env.NODE_ENV;

const dev = {
	app: {
		port: 8000
	},
	db: {
		host: 'mongodb://localhost',
		port: 27017,
		name: 'fweha1',
	},
	priceAPI: {
		endpoint: 'https://api.priceapi.com/v2/jobs',
		token: 'TMMQFUMKMDRXICUZYTXAFFTEESNKMUOGSPEKVNMVOCEGSTXLYRCQBVAFETUCHDKB',
		source: 'google_shopping',
		country: 'de',
		topic: 'search_results',
		key: 'gtin',
		max_pages: 3
	}
};

const test = {
	app: {
		port: 8000
	},
	db: {
		host: 'mongodb://localhost',
		port: 27017,
		name: 'fweha1_test',
	},
	priceAPI: {
		endpoint: 'https://api.priceapi.com/v2/jobs',
		token: 'TMMQFUMKMDRXICUZYTXAFFTEESNKMUOGSPEKVNMVOCEGSTXLYRCQBVAFETUCHDKB',
		source: 'google_shopping',
		country: 'de',
		topic: 'search_results',
		key: 'gtin',
		max_pages: 3
	}
};

const live = {
	app: {
		port: 8000
	},
	db: {
		host: 'mongodb://localhost',
		port: 27017,
		name: 'fweha1_live',
		collection: 'products'
	},
	priceAPI: {
		endpoint: 'https://api.priceapi.com/v2/jobs',
		token: 'TMMQFUMKMDRXICUZYTXAFFTEESNKMUOGSPEKVNMVOCEGSTXLYRCQBVAFETUCHDKB',
		source: 'google_shopping',
		country: 'de',
		topic: 'search_results',
		key: 'gtin',
		max_pages: 3
	}
};

const config = {
	dev,
	test,
	live
};

module.exports = config[env];