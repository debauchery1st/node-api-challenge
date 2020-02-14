const express = require("express");
const server = express();
const helmet = require("helmet");
const port = process.env.PORT;
server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res
    .status(200)
    .send("web26 - Sprint Challenge: Express and Node.js - Projects & Actions");
});

server.listen(port || 5000, () =>
  console.log(`\n*** listening at ${port || 5000} *** \n`)
);
