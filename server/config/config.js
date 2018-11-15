module.exports = {
  app: {
    port: process.env.PORT || 8000
  },
  db: {
    host: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    name: process.env.MONGODB_NAME
  },
  priceAPI: {
    endpoint: "https://api.priceapi.com/v2/jobs",
    token: "TMMQFUMKMDRXICUZYTXAFFTEESNKMUOGSPEKVNMVOCEGSTXLYRCQBVAFETUCHDKB",
    source: "google_shopping",
    country: "de",
    topic: "search_results",
    key: "gtin",
    max_pages: 3
  }
};
