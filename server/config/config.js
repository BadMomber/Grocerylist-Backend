const env = process.env.NODE_ENV;

const priceApi = {
  endpoint: "https://api.priceapi.com/v2/jobs",
  token: "TMMQFUMKMDRXICUZYTXAFFTEESNKMUOGSPEKVNMVOCEGSTXLYRCQBVAFETUCHDKB",
  source: "google_shopping",
  country: "de",
  topic: "search_results",
  key: "gtin",
  max_pages: 3
};

const dev = {
  app: {
    port: 8000
  },
  db: {
    host: "mongodb://localhost",
    port: 27017,
    name: "fweha1"
  },
  priceAPI
};

const test = {
  app: {
    port: 8000
  },
  db: {
    host: "mongodb://localhost",
    port: 27017,
    name: "fweha1_test"
  },
  priceAPI
};

const live = {
  app: {
    port: 8000
  },
  db: {
    host: "mongodb://localhost",
    port: 27017,
    name: "fweha1_live",
    collection: "products"
  },
  priceAPI
};

const config = {
  dev,
  test,
  live
};

module.exports = config[env];
