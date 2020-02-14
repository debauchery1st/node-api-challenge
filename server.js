const express = require("express");
const server = express();
const helmet = require("helmet");
const port = process.env.PORT;

// built-in middleware
server.use(express.json());

// third-party middleware
server.use(helmet());

// local routers
server.use("/api/projects", require("./resources/projectsRouter"));
server.use("/api/actions", require("./resources/actionsRouter"));

// perimeter
server.get("/api", (req, res) => {
  res.status(200).send("🥧");
});

server.get("/", (req, res) => {
  res
    .status(200)
    .send("web26 - Sprint Challenge: Express and Node.js - Projects & Actions");
});

server.listen(port || 5000, () =>
  console.log(`\n*** listening at ${port || 5000} *** \n`)
);
