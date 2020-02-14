const express = require("express");
const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");
const mw = require("./MiddleWares");

router = express.Router();
router.get("/", (req, res) => {
  projects.get().then(lst => res.status(200).json(lst));
});
router.get("/:id/actions", mw.validateProjectId, (req, res) => {
  console.log("projectRouter");
  res.status(200).json(req.actions);
});

router.post("/", mw.hasBody, mw.hasDescription, mw.hasName, (req, res) => {
  actions.insert(req.body).then(foo => {
    res.status(201).json(foo);
  });
});

router.put("/:id", mw.validateProjectId, mw.hasBody, (req, res) => {
  actions.update(req.params.id, req.body).then(foo => {
    res.status(201).json(foo);
  });
});

module.exports = router;
