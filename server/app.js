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

app.use((err, req, res, next) => {
  console.error(`💥[SERVER ERROR]: ${err.message}`);
  res.status(err.status || 500).json({
    error: "ERRRORRRR ಥ_ಥ",
  });
});
process.on("uncaughtException", (err) => {
  console.error(`⛔[FATAL ERROR]: ${err.message}`);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error(`😐[PROMISE REJECTED]: ${reason}`);
});
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
