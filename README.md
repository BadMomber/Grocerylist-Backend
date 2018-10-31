# FWE-WS18-19-749664-HA1 - Grocery list backend

Backend server and API for storage and retrieval of everyday items. Full CRUD functionality and CSV export.

## Motivation

Create a simple API that can be used and evaluated in a variety of ways. Supporting automatic Google Shopping price detection to have a better overview of everyday costs

## Build status

## Code style

Standard

## Screenshots

## Tech/framework used

node.js & mongodb

### Build with

Express & mongoose.

### Architecture

ME(A)N

## Features

- Supporting full CRUD functionality.
- Export to CSV.
- Auto detecting lowest price on Google Shopping (if requirements are met).

## Installation

## API Reference

## How to use?

### DEV mode: "npm run dev"
- Run the server in dev mode with nodemon live reload
- Makes use of the dev DB.
### TEST mode: "npm run test"
- Run all tests on the server
- Makes use of test DB. All data will be deleted from DB before every test run.
### LIVE mode: "npm run live"
- Run the server
- Makes use of live DB

## Further information

### How priceAPI works:

Step 1: 
- POST a new job (POST https://api.priceapi.com/v2/jobs)
- token: API-Key
- source: e.g.: google_shopping
- -country: de
- topic: search_results
- key: gtin
- values: (the actual gtin as value for the key above) e.g. 3495080735275

 
Google Shopping:
- Topic: search_results
- Supported keys: gtin
- Supported parameters: min_price


Step 2: 
- Request a jobs status until it is finished (GET https://api.priceapi.com/v2/jobs/:job_id)
- Path params: job_id (see step 1)
- Query params: token=YOUR_API_KEY
- e.g. https://api.priceapi.com/v2/jobs/:job_id?token=myAPIkey
 

Step 3: 
- Download a finished job's result
- e.g. https://api.priceapi.com/v2/jobs/job_id/download
- Path params: job_id
- Query params: token=YOUR_API_KEY


