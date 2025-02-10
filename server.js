import app from "./src/app.js";
import http from "http";
import config from "./src/config/config.js";
import connect from "./src/db/db.js";

connect(); // Connect to MongoDB database

const server = http.createServer(app);

const PORT = config.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
