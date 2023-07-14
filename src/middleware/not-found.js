const Response = require("../helper/response");
const pageNotFound = (req, res, next) => {
   const response = new Response({}, "Page not found", 404, "Not Found");
   res.status(404).json(response);
};

module.exports = pageNotFound;
