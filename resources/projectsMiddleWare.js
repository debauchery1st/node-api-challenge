const proj = require("../data/helpers/projectModel");

function validateProjectId(req, res, nxt) {
  const project_id = Number(req.params.id);
  project_id && project_id >= 0
    ? proj
        .getProjectActions(project_id)
        .then(lst =>
          lst.length > 0
            ? (req.actions = lst) && nxt()
            : res.status(400).json({
                errorMessage: `no actions recorded for project ${project_id}`
              })
        )
        .catch(err => res.status(400).json({ errorMessage: "err" }))
    : res.status(400).json({ errorMessage: "invalid ID" }) ||
      res.status(400).json({ errorMessage: "requires ID" });
}

module.exports = { validateProjectId };
