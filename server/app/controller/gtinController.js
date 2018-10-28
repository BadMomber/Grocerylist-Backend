/**
 * How priceAPI works:
 * Step 1: POST a new job (POST https://api.priceapi.com/v2/jobs)
 * required parameters:
 * token: API-Key
 * source: e.g.: google-shopping, amazon
 * country: de
 * topic: search_results
 * key: gtin
 * values: (the actual gtin as value for the key above) e.g. 3495080735275
 * priceAPI API-Key:
 * TMMQFUMKMDRXICUZYTXAFFTEESNKMUOGSPEKVNMVOCEGSTXLYRCQBVAFETUCHDKB
 *
 * Google Shopping:
 * Topic: search_results
 * Supported keys: gtin
 * Supported parameters: min_price, max_price
 *
 * Amazon:
 * Topic: search_results
 * Supported keys: gtin
 * Supported parameters: min_price, max_price
 *
 * Only relevant information is the job_id - must be saved for step 2 & 3
 *
 * Step 2: Request a jobs status until it is finished (GET https://api.priceapi.com/v2/jobs/:job_id)
 * Path params: job_id (see step 1)
 * Query params: token=YOUR_API_KEY
 * e.g. https://api.priceapi.com/v2/jobs/:job_id?token=myAPIkey
 *
 * Step 3: Download a finished job's result
 * e.g. https://api.priceapi.com/v2/jobs/job_id/download
 * Path params: job_id
 * Query params: token=YOUR_API_KEY
 * Format option: row / column
 */
/** Package imports */
const request = require('request-promise');
const productSchema = require('../../models/product');
const mongoose = require('mongoose');

/** priceAPI configuration */
const endpoint = "https://api.priceapi.com/v2/jobs";
const priceAPIkey = "TMMQFUMKMDRXICUZYTXAFFTEESNKMUOGSPEKVNMVOCEGSTXLYRCQBVAFETUCHDKB";
const source = "google_shopping";
const country = "de";
const topic = "search_results";
const key = "gtin";
let jobId = "";
let jobDone = false;

class GtinController {

	constructor() {};

    async postPriceRequest(gtin) {

        try {
            const requestOptions = {
                method: 'POST',
                uri: endpoint,
                body: {
                    token: priceAPIkey,
                    source: source,
                    country: country,
                    topic: topic,
                    key: key,
                    values: gtin
                },
                json: true
            };

            const job = await request(requestOptions);
            jobId = job.job_id;
            return jobId;

        } catch (e) {
            console.log(e);
        }
    }

	async downloadPrice(jobId, callback) {
        console.log("Jetzt in downloadPrice()");
        const requestOptions = {
            method: 'GET',
            uri: endpoint + "/" + jobId + "/download",
            body: {
                token: priceAPIkey
            },
            json: true
        };

        console.log("Downloading job result");
        const jobResult = await request(requestOptions);
        const price = await jobResult.results[0].content.search_results[0].min_price;
        console.log("Price: " + price);
        return price;
    }

    async getJobStatus(jobId) {
        const requestOptions = {
            method: 'GET',
            uri: endpoint + "/" + jobId,
            body: {
                token: priceAPIkey
            },
            json: true
        };

        const job = await request(requestOptions);
        if(job.status !== "finished") {
            console.log("Job is not finished yet");
            jobDone = false;
        } else {
            console.log("Job is finished");
            jobDone = true;
            return true;
        }
    }

}

module.exports = GtinController;
