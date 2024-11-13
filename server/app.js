const express = require("express");
const http = require("http");
const { initializeAPI } = require("./api");
const fs = require("fs");
const logRequests = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const user = req.user ? req.user.username : "USER NOT INDENTIFICATET 🤐";
  const logEntry = `[${timestamp}] User: ${user}, Method: ${req.method}, URL: ${req.originalUrl}\n`;
  console.log(logEntry.trim());

  next();
};
// Create the express server
const app = express();
app.disable("x-powered-by");
app.use(express.json());
const server = http.createServer(app);
app.use(logRequests);

// deliver static files from the client folder like css, js, images
app.use(express.static("client"));
// route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// Initialize the REST api
initializeAPI(app);

//start the web server
const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`Express Server started on port ${serverPort}`);
});
