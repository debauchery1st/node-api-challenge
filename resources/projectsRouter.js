const express = require("express");
const projects = require("../data/helpers/projectModel");
const mw = require("./MiddleWares");

router = express.Router();

router.get("/", (req, res) => {
  projects.get().then(lst => res.status(200).json(lst));
});

router.get("/:id/actions", mw.validateProjectId, (req, res) => {
  res.status(200).json(req.actions);
});

router.post(
  "/",
  mw.hasBody,
  mw.bodyHasName,
  mw.bodyHasDescription,
  (req, res) => {
    projects.insert(req.body).then(foo => {
      res.status(201).json(foo);
    });
  }
);

router.put(
  "/:id",
  mw.validateProjectId,
  mw.hasBody,
  mw.bodyHasName,
  mw.bodyHasDescription,
  (req, res) => {
    projects.update(req.params.id, req.body).then(foo => {
      res.status(201).json(foo);
    });
  }
);

router.delete("/:id", mw.replicateProject, (req, res) => {
  req.replicator.length === 1
    ? projects
        .remove(req.params.id)
        .then(() => res.status(200).json(req.replicator))
        .catch(err => res.status(400).json(err))
    : res
        .status(404)
        .json({ errorMessage: `project ${req.params.id} does not exist` });
});

module.exports = router;
