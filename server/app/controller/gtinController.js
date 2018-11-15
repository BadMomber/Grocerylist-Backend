/** Package imports */
const request = require ('request-promise');

/** File import */
const config = require ('../../config/config');

/** Initializers */
let jobId = "";
let jobDone = false;

class GtinController {
  
  constructor() {
  };
  
  async postPriceRequest(gtin) {
    
    try {
      const requestOptions = {
        method: 'POST',
        uri: config.priceAPI.endpoint,
        body: {
          token: config.priceAPI.token,
          source: config.priceAPI.source,
          country: config.priceAPI.country,
          topic: config.priceAPI.topic,
          key: config.priceAPI.key,
          values: gtin,
          max_pages: config.priceAPI.max_pages
        },
        json: true
      };
      
      const job = await request (requestOptions);
      jobId = job.job_id;
      return jobId;
      
    } catch (e) {
      console.log (e);
    }
  }
  
  async downloadPrice(jobId) {
    try {
      const requestOptions = {
        method: 'GET',
        uri: config.priceAPI.endpoint + "/" + jobId + "/download",
        body: {
          token: config.priceAPI.token
        },
        json: true
      };
      
      const jobResult = await request (requestOptions);
      if (jobResult.results[0].content.search_results[0] != null) {
        const price = await jobResult.results[0].content.search_results[0].min_price;
        console.log ("Product found. Google Shopping minimum price: " + price);
        return price;
      } else {
        console.log ("Couldn't find product. Saving product without price.");
        return null;
      }
      
    } catch (e) {
      console.log (e);
    }
  }
  
  async getJobStatus(jobId) {
    try {
      const requestOptions = {
        method: 'GET',
        uri: config.priceAPI.endpoint + "/" + jobId,
        body: {
          token: config.priceAPI.token
        },
        json: true
      };
      
      const job = await request (requestOptions);
      if (job.status === "finished") {
        jobDone = true;
        return true;
      } else {
        jobDone = false;
        return false;
      }
    } catch (e) {
      console.log (e);
    }
  }
}

module.exports = GtinController;
