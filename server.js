const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("QrCodeScan", (data) => {
        console.log("QR data received:", data);
        socket.broadcast.emit("update-data", data);
    });
});

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => console.log(`Socket.IO server running on ${PORT}`));
