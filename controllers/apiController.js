function index(req, res) {
  res.json({
    message: "Welcome to my project-01!",
    // documentation_url: "https://github.com/morgansharif/project-01/blob/master/README.md",
    // base_url: "https://floating-thicket-55818.herokuapp.com/",
    endpoints: [
      {method: "GET",     path: "/api", description: "Describes available endpoints"},
      {method: "GET",     path: "/api/repos/:id", description: "Returns a specific Repo by ID."},
      {method: "POST",    path: "/api/repos", description: "Creates a new Repo. Optionally takes 'name: <new repo name>'."},
      {method: "PUT",     path: "/api/repos/:id", description: "Updates the 'name' value of a Repo. Takes 'name: <new Repo name>'. Returns the updated repo name."},
      {method: "DELETE",  path: "/api/repos/:id", description: "Deletes a Repo by ID. Returns the Repo that was deleted."},
      {method: "POST",    path: "/api/repos/:id/snippets", description: "Creates a new Snippet in a target Repo by ID. Takes no inputs, and returns new snippet with placeholder data in 'title', 'desc', and 'code' fields."},
      {method: "PUT",     path: "/api/repos/:repo_id/snippets/:snippet_id", description: "Updates a Snippet by ID within its Repo. Takes 'title', 'desc', and 'code' then updates all of them from incoming values. Returns the updated Snippet."},
      {method: "DELETE", path: "/api/repos/:repo_id/snippets/:snippet_id", description: "Deletes a Snippet by ID within its Repo. Returns the deleted snippet."}
    ]
  });
}

module.exports.index = index;
