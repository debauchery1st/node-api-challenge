const express = require("express");
const projects = require("../data/helpers/projectModel");
const mw = require("./projectsMiddleWare");

router = express.Router();
router.get("/", (req, res) => {
  projects.get().then(lst => res.status(200).json(lst));
});
router.get("/:id/actions", mw.validateProjectId, (req, res) => {
  console.log("projectRouter");
  res.status(200).json(req.actions);
});

module.exports = router;
