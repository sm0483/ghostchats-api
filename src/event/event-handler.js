const validateMessage = require("../validator/validator");
const Response = require("../helper/response");
const constants = require("../constant/constant");

class SocketEventHandler {
   static usersByRoom = {};

   constructor(socket) {
      this.socket = socket;
      this.roomId = socket.handshake.query["room-id"];
      this.username = socket.handshake.query["name"];
      this.socket.join(this.roomId);
      this.handleConnect();
      this.socket.on("send_chat", this.handleSendChat);
      this.socket.on("disconnect", this.handleDisconnect);
   }

   handleSendChat = (msg) => {
      try {
         const error = validateMessage(msg);

         if (error) {
            const errorResponse = new Response({}, error, 400, "Bad Request");
            return this.socket.emit("error", errorResponse);
         }

         const response = new Response(msg, constants.success, 200, null);
         this.socket.to(this.roomId).emit("receive_chat", response);
      } catch (error) {
         console.log(error);
         const errorResponse = new Response({}, constants.intError, 500, error);
         return this.socket.emit("error", errorResponse);
      }
   };

   handleDisconnect = () => {
      SocketEventHandler.usersByRoom[this.roomId] =
         SocketEventHandler.usersByRoom[this.roomId].filter(
            (user) => user !== this.username
         );
      this.socket.to(this.roomId).emit("user_left", this.username);
   };

   handleConnect = () => {
      if (!SocketEventHandler.usersByRoom[this.roomId]) {
         SocketEventHandler.usersByRoom[this.roomId] = [];
      }

      if (SocketEventHandler.usersByRoom[this.roomId].includes(this.username)) {
         this.socket.emit("error", "Username already exists");
         this.socket.disconnect();
      } else {
         SocketEventHandler.usersByRoom[this.roomId].push(this.username);
         this.socket.to(this.roomId).emit("user_joined", this.username);
      }
   };
}

module.exports = SocketEventHandler;
