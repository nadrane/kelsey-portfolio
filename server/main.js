"use strict";

const db = require("./db");
const { debug, logError } = require('./loggers')

const server = require("http").createServer();

const createApplication = function() {
  const app = require("./app");
  server.on("request", app); // Attach the Express application.
};

const startServer = function() {
  const PORT = process.env.PORT || 1337;

  server.listen(PORT, function() {
    debug({message: `Server started on port ${PORT}`});
  });
};

db.then(createApplication).then(startServer).catch(function(err) {
  logError({type: "server", message:"the server failed to start", err});
  process.exit(1);
});
