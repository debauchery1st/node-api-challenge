const express = require("express");
const projects = require("../data/helpers/projectModel");

router = express.Router();
router.get("/", (req, res) => {
  projects.get().then(lst => res.status(200).json(lst));
});

module.exports = router;
