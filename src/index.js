require("dotenv").config();

const express = require("express");
const app = express();

const http = require("http").Server(app);
const port = process.env.PORT || 3000;

const SocketEventHandler = require("./event/event-handler");
const cors = require("cors");
const idRouter = require("./router/router");

const io = require("socket.io")(http, {
   cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
   },
});

const pageNotFound = require("./middleware/not-found");
const morgan = require("morgan");

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

io.on("connection", (socket) => {
   new SocketEventHandler(socket);
});

http.listen(port, () => {
   console.log(`listening on *:${port}`);
});

app.use("/", idRouter);
app.use(pageNotFound);
