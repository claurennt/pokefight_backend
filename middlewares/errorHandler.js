const errorHandler = (err, res, req, next) => {
  console.log(err.stack);
  res.status(500).send("An error has occures.The admin has been informed.");
};

module.exports = errorHandler;
