const db = require("../models");
const Exercise = db.exercises;


// Create and Save a new Exercise
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Exercise
    const exercise = new Exercise({
        name: req.body.name,
    });

    // Save Exercise in the database
    exercise
        .save(exercise)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Exercise."
            });
        });
};

// Retrieve all Exercises from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Exercise.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving exercises."
            });
        });
};

// Find a single Exercise with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Exercise.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Exercise with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Exercise with id=" + id });
        });
};

// Update a Exercise by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Exercise.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Exercise with id=${id}. Maybe Exercise was not found!`
                });
            } else res.send({ message: "Exercise was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Exercise with id=" + id
            });
        });
};

// Delete a Exercise with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Exercise.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Exercise with id=${id}. Maybe Exercise was not found!`
                });
            } else {
                res.send({
                    message: "Exercise was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Exercise with id=" + id
            });
        });
};

// Delete all Exercises from the database.
exports.deleteAll = (req, res) => {
    Exercise.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Exercises were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all exercises."
            });
        });
};
