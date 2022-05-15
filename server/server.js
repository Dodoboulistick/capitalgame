const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const path = require('path');
const http = require('http');
const app = express();

var corsOptions = {
  origin: ["https://jeudescapitales.fr","http://localhost:4200"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


db.sequelize.sync();

app.use(express.static(__dirname + '/server'))

// simple route
app.get("/", (req, res) => {
  console.log("Welcome to jeudescapitales API")
  res.sendFile(path.join(__dirname));
});

require("./app/routes/score.routes.js")(app);

const server = http.createServer(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(PORT)
});
