const validateMessage = require("../validator/validator");
const Response = require("../helper/response");
const constants = require("../constant/constant");

class SocketEventHandler {
   constructor(socket) {
      this.socket = socket;
      this.roomId = socket.handshake.query["room-id"];
      this.username = socket.handshake.query["name"];

      this.socket.join(this.roomId);
      this.socket.to(this.roomId).emit("user_joined", this.username);

      this.handleSendChat = this.handleSendChat.bind(this);
      this.handleDisconnect = this.handleDisconnect.bind(this);

      this.socket.on("send_chat", this.handleSendChat);
      this.socket.on("disconnect", this.handleDisconnect);
   }

   handleSendChat(msg) {
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
   }

   handleDisconnect() {
      this.socket.to(this.roomId).emit("user_left", this.username);
   }
}

module.exports = SocketEventHandler;
