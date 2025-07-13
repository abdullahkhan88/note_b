const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./App/db_Connection/db');
const UserNotes = require('./App/routes/note_routes');
const http = require("http");
const { Server } = require("socket.io");
const handleSocketConnection = require("./App/socket/socketHandler");

dotenv.config();
connectDB();

const app = express(); 
const server = http.createServer(app); 

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT"]
  }
});


app.use(cors());
app.use(express.json());


app.use("/web/api", UserNotes);


handleSocketConnection(io);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
