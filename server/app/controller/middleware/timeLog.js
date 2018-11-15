/** Custom middleware that logs the current time */
module.exports = (req, res, next) => {
  console.log ('time', Date.now ());
  next ();
};
