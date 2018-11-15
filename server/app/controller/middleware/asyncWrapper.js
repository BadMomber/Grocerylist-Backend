/** Basic async error wrapper so we don't need a trycatch in every function */
module.exports = function asyncWrapper(handler) {
  return function (req, res, next) {
    handler (req, res, next).catch ((e) => {
      console.log (e);
      res.status (500).send ({
        error: e.message
      });
    });
  };
};
