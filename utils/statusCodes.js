
const forbidden = (message) => {
  const err = new Error(message);
  err.statusCode = 403;
  return err;
};

const notFound = () => {
  const err = new Error('Resource not found.');
  err.statusCode = 404;
  return err;
};

const unprocessableEntity = (message) => {
  const err = new Error(message);
  err.statusCode = 422;
  return err;
};

module.exports = {
  forbidden,
  notFound,
  unprocessableEntity
};