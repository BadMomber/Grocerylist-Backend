/** Package imports */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/** File imports */
const timeService = require('./services/timeService');
const db = require('./config/db');

/** Initializers */
const dbConnection = mongoose.connection;
const app = express();
const port = db.port;


app.use(bodyParser.urlencoded({
	extended: true
}));


mongoose.set('bufferCommands', false);
mongoose.Promise = global.Promise;
mongoose.connect(db.url, (err, database) => {
	if (err) return console.log(err)
	require('./app/routes')(app, database);
	app.listen(port, () => {
		console.log("> We are live on " + port);
	});
});


dbConnection.on('error', console.error.bind(console, 'connection error:'));
dbConnection.once('open', function () {
	console.log();
	console.log(timeService.getDateTime());
	console.log('> Mongoose is connected.');
});
