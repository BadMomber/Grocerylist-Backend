/** Package imports */
const productRoutes = require('./routes');

/** Package exports */
module.exports = function (app, db) {
	productRoutes(app, db);
	// Other route groups could go here, in the future
};
