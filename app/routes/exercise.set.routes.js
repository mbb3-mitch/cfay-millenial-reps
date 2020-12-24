module.exports = app => {
    const set = require("../controllers/exercise.set.controller.js");

    var router = require("express").Router();

    // Create a new Exercise
    router.post("/", set.create);

    // Retrieve all Exercises
    router.get("/", set.findAll);


    // Retrieve a single Exercise with id
    router.get("/:id", set.findOne);

    // Update a Exercise with id
    router.put("/:id", set.update);

    // Delete a Exercise with id
    router.delete("/:id", set.delete);

    // Create a new Exercise
    router.delete("/", set.deleteAll);

    app.use('/api/sets', router);
};
