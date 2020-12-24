const db = require("../models");
const Set = db.sets;

// Create and Save a new Set
exports.create = (req, res) => {
    const {exercise_id, reps = 0, duration = 0} = req.body;
    // Validate request
    if (!req.body.exercise_id) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a Set
    const set = new Set({
        exercise_id,
        reps,
        duration
    });

    // Save set in the database
    set
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Set."
            });
        });
};

// Retrieve all Sets from the database.
exports.findAll = (req, res) => {
    const {exercise_id} = req.query;
    const condition = exercise_id ? {exercise_id} : {};

    Set.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sets."
            });
        });
};

// Find a single Set with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Set.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Set with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Set with id=" + id});
        });
};

// Update a Set by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Set.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Set with id=${id}. Maybe Set was not found!`
                });
            } else res.send({message: "Set was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Set with id=" + id
            });
        });
};

// Delete a Set with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Set.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Set with id=${id}. Maybe Set was not found!`
                });
            } else {
                res.send({
                    message: "Set was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Set with id=" + id
            });
        });
};

// Delete all Sets from the database.
exports.deleteAll = (req, res) => {
    Set.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Sets were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all sets."
            });
        });
};
