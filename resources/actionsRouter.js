const express = require("express");
const actions = require("../data/helpers/actionModel");

router = express.Router();
router.get("/", (req, res) => {
  actions.get().then(lst => res.status(200).json(lst));
});

module.exports = router;
