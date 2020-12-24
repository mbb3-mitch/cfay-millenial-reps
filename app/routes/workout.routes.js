module.exports = app => {
    const workout = require("../controllers/workout.controller.js");

    var router = require("express").Router();

    // Create a new Exercise
    router.post("/", workout.create);

    // Retrieve all Exercises
    router.get("/", workout.findAll);


    // Retrieve a single Exercise with id
    router.get("/:id", workout.findOne);

    // Update a Exercise with id
    router.put("/:id", workout.update);

    // Delete a Exercise with id
    router.delete("/:id", workout.delete);

    // Create a new Exercise
    router.delete("/", workout.deleteAll);

    app.use('/api/workouts', router);
};
