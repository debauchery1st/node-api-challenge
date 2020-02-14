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

function hasBody(req, res, nxt) {
  Object.keys(req.body).length > 0
    ? nxt()
    : res.status(400).json({ errorMessage: "no body" });
}

function hasProjectId(req, res, nxt) {
  // check for project_id
  Object.keys(req.body).includes("project_id")
    ? nxt()
    : res.status(400).json({ errorMessage: "project id required" });
}

function hasDescription(req, res, nxt) {
  // check for a description in the body
  Object.keys(req.body).includes("description")
    ? nxt()
    : res.status(400).json({ errorMessage: "description required" });
}

function hasName(req, res, nxt) {
  // check for a description in the body
  Object.keys(req.body).includes("name")
    ? nxt()
    : res.status(400).json({ errorMessage: "name required" });
}

module.exports = {
  validateProjectId,
  hasBody,
  hasProjectId,
  hasDescription,
  hasName
};
