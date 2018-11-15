# FWE-WS18-19-749664-HA1 - Grocery list API

## Table of contents

* [Motivation](#motivation)
* [Code style](#techframework-used)
* [Features](#features)
* [Getting started](#getting-started)
* [API Reference](#api-reference)
* [Testing](#testing)
* [Further information](#further-information)
* [Credits](#credits)

Backend server and API for storage and retrieval of everyday items. Full CRUD functionality and CSV export.

## Motivation

Create a simple API that can be used and evaluated in a variety of ways. Supporting automatic Google Shopping price detection to have a better overview of everyday costs

## Tech/framework used

node.js & mongodb

### Code style

Standard

### Build with

Express & mongoose.

### Architecture

ME(A)N

## Features

- Supporting full CRUD functionality.
- Export to CSV.
- Auto detecting lowest price on Google Shopping (if requirements are met).

## Getting started
### Copy repository
```
# clone repository
$ git clone https://code.fbi.h-da.de/istkekrie/fwe-ws18-19-749664-ha1.git
```
### Configuration
```
# switch to projects root
$ cd fwe-ws18-19-749664-ha1

# copy sample configuration
$ cp .env.dist .env

# adjust config to your needs
$ atom/nano/vim .env

# set environment vars from config
$ source .env
```
### Default configuration
**Server runs on port:**
- 4000

**MongoDB host:**
- localhost

**MongoDB port:**
- 27017
### Run using Docker
Make sure you have [docker](https://docs.docker.com/) installed and running.

I recommend using docker engine 17.12 as docker-compose file asks for docker-compose 2.4. Otherwise please feel free 
to customize the version suiting your needs.
```
# Run docker image in DEV mode
$ docker-compose up --build
```
### Run not using Docker
Make sure you have [mongodb](https://docs.mongodb.com/manual/administration/install-community/) and [node](https://nodejs.org/en/download/) installed.
Alternative [install node via package manager](https://nodejs.org/en/download/package-manager/).

Make sure you have mongodb up and running.
```
# Start mongodb daemon
$ mongod

# Start a database listening on port 27017
$ mongo --port 27017
```


Build and install:

```
# switch to project-root/server
$ cd fwe-ws18-19-749664-ha1/server

# install dependencies
$ npm install
```
### Run in dev mode
```
$ npm run dev
```
### Run in testmode
```
$ npm run test
```
### Run in testmode
```
$ npm run live
```
## API Reference
### API routes

**GET all products on list**

`/api/products`

**GET all products on list and download as CSV**

`/api/products/csv`

**GET product by id**

`/api/products/:id`

**DELETE product by id**

`/api/products/:id`

**UPDATE product by id**

`/api/products/:id`

**POST new product**

`/api/products`

## Testing
### Testing with Chai
Testing with Chai does **NOT** work in the delivered docker container!
```
# run tests
$ npm run test || $ npm test
```
### Testing with Postman
**If you run the app in docker**, you can **not use** the build in **Chai** tests. Instead, feel free to use the 
delivered
Postman collection. You can find a prepared collection with everything you need to do some testing here: [Postman 
collection](/server/test/few-ha-1-NEU.postman_collection.json)
```
# run app in dev mdoe
$ npm run dev
```


### Test results
Tested with [Chai](https://www.chaijs.com/)

![Chai test results](/server/test/testresults.png "Chai test results")

## Further information

### Auto-detecting minimal price from Google Shopping
If you set a valid GTIN to your new product POST request, the server will automatically check if the product is 
listed on Google Shopping. If so, the server returns the minimal price found and automatically saves it to the new 
posted product.

**Example POST request body**
```
{
    "gtin": "4015100198980",
    "name": "Got2b Haarwax",
    "description": "strand matte, Surfer Look Matt-Paste 100g",
    "amount": 1,
    "unit": "Packung",
}
```
### How priceAPI works:

**Step 1:** 
- POST a new job

`POST https://api.priceapi.com/v2/jobs)`
- token: API-Key
- source: e.g.: google_shopping
- -country: de
- topic: search_results
- key: gtin
- values: (the actual gtin as value for the key above) e.g. 4015100198980

 
Google Shopping:
- Topic: search_results
- Supported keys: gtin
- Supported parameters: min_price


**Step 2:**
- Request a jobs status until it is finished

`GET https://api.priceapi.com/v2/jobs/:job_id`
- Path params: job_id (see step 1)
- Query params: token=YOUR_API_KEY

`https://api.priceapi.com/v2/jobs/:job_id?token=myAPIkey`
 

**Step 3:**
- Download a finished jobs result

`https://api.priceapi.com/v2/jobs/job_id/download`
- Path params: job_id
- Query params: token=YOUR_API_KEY

## Credits
### Tools and articles I used
[Robo 3T](https://robomongo.org/) - Download [free version here](https://robomongo.org/download)

[priceAPI](https://www.priceapi.com/) free trial version

[Postman](https://www.getpostman.com/)

[Build a Node.js API in Under 30 Minutes](https://medium.freecodecamp.org/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2)

[Building RESTful Web APIs with Node.js, Express, MongoDB and TypeScript](https://itnext.io/building-restful-web-apis-with-node-js-express-mongodb-and-typescript-part-1-2-195bdaf129cf)

[Docker Compose with example App & Mongo](https://gist.github.com/wesleybliss/29d4cce863f5964a3eb73c42501d99e4)

[Docker compose with Node.js and MongoDB](https://medium.com/@kahana.hagai/docker-compose-with-node-js-and-mongodb-dbdadab5ce0a)

[How to easily set-up node config following these best practices](https://codingsans.com/blog/node-config-best-practices)

