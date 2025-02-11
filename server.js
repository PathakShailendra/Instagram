import app from "./src/app.js";
import http from "http";
import config from "./src/config/config.js";
import connect from "./src/db/db.js";
import initSocket from "./src/sockets/socket.io.js";

connect(); // Connect to MongoDB database

const server = http.createServer(app);
const PORT = config.PORT;

initSocket(server); // Initialize socket.io server

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
