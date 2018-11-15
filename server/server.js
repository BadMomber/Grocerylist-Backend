/** Package imports */
const bodyParser = require ('body-parser');
const express = require ('express');
const mongoose = require ('mongoose');
const cors = require('cors');

/** File import */
const timeService = require ('./services/timeService');
const router = require('./app/controller/router');
const config = require ('./config/config');

/** Initialize db connection string */
const dbConnection = "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.name;

/** Connect to mongoose */
mongoose.connect (
	dbConnection,
	{
		useNewUrlParser: true,
	},
	console.log ('> Mongoose is connected.'),
	console.log ('> Using database', config.db.name)
);

/** Initialize express */
const app = express ();

/** Middleware */
app.use(cors());
app.use (bodyParser.urlencoded ({extended: true}));
app.use (bodyParser.json ());
app.use (bodyParser.text ());


/** Routes */
app.get ('/', (req, res) => {
	res.send ('Hello World');
});

app.use ('/api', router.router);

console.log (timeService.getDateTime ());
console.log ('We are live on', config.app.port);

app.listen (config.app.port);

/** Exports */
module.exports = app;
