class Response {
   constructor(data, message, status, error) {
      this.data = data;
      this.message = message;
      this.status = status;
      this.error = error;
   }
}

module.exports = Response;
