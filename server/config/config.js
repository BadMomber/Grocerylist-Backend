console.log("env", process.env);
module.exports = {
  app: {
    port: process.env.PORT || 8000
  },
  db: {
    host: "mongodb://" + process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    name: process.env.MONGODB_NAME
  },
  priceApi: {
    endpoint: "https://api.priceapi.com/v2/jobs",
    token: "TMMQFUMKMDRXICUZYTXAFFTEESNKMUOGSPEKVNMVOCEGSTXLYRCQBVAFETUCHDKB",
    source: "google_shopping",
    country: "de",
    topic: "search_results",
    key: "gtin",
    max_pages: 3
  }
};
