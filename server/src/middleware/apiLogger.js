const morgan = require("morgan");

const apiLogger = morgan("dev");

module.exports = {
  apiLogger,
};
