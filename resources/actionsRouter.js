const express = require("express");
const actions = require("../data/helpers/actionModel");
const mw = require("./MiddleWares");

router = express.Router();

router.get("/", (req, res) => {
  actions.get().then(lst => res.status(200).json(lst));
});

router.get("/:id", mw.replicateAction, (req, res) => {
  req.replicator.length === 1
    ? res.send(200).json(req.replicator.pop())
    : res
        .send(404)
        .json({ errorMessage: `no action with id ${req.params.id}` });
});

router.post(
  "/",
  mw.hasBody,
  mw.bodyHasProjectId,
  mw.bodyHasDescription,
  mw.bodyHasNotes,
  (req, res) => {
    actions.insert(req.body).then(foo => res.status(200).json(foo));
  }
);

router.put(
  "/:id",
  mw.hasBody,
  mw.bodyHasProjectId,
  mw.bodyHasDescription,
  mw.bodyHasNotes,
  (req, res) => {
    actions
      .update(req.params.id, req.body)
      .then(foo => res.status(200).json(foo))
      .catch(err => res.status(400).json(err));
  }
);

router.delete("/:id", mw.replicateAction, (req, res) => {
  req.replicator.length === 1
    ? actions
        .remove(req.params.id)
        .then(() => res.status(200).json(req.replicator))
        .catch(err => res.status(400).json(err))
    : res.status(404).json({
        errorMessage: `action with id ${req.params.id} does not exist`
      });
});

module.exports = router;
