module.exports = app => {
    const scores = require("../controllers/score.controller.js");
  
    var router = require("express").Router();
  
    // Create a new score
    router.post("/", scores.create);
  
    // Retrieve all scores
    router.get("/", scores.findAll);

    //Retrieve all scores by type
    router.get("/:type", scores.findByType)
  
    // Update a score with id
    router.put("/:id", scores.update);
  
    // Delete a score with id
    router.delete("/:id", scores.delete);

  
    app.use('/scores', router);
  };