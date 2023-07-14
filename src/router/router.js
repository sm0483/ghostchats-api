const router = require("express").Router();
const Response = require("../helper/response");
const generateRoomId = require("../helper/code");

router.get("/", (req, res) => {
   const response = new Response(
      {
         200: "OK",
         201: "Created",
         400: "Bad Request",
         401: "Unauthorized",
         403: "Forbidden",
         404: "Not Found",
         500: "Internal Server Error",
      },
      "Hello World",
      200,
      null
   );
   res.status(200).json(response);
});

router.get("/room-ids", (req, res) => {
   const roomId = generateRoomId();
   const response = new Response(
      { roomId },
      "Room Id generated successfully",
      200,
      null
   );
   res.status(200).json(response);
});

module.exports = router;
