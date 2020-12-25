const db = require("../models");
const Workout = db.workouts;

// Create and Save a new Workout
exports.create = (req, res) => {
    const {name, sets = [], duration = 0} = req.body;
    // Validate request
    if (!req.body.name) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a Workout
    const workout = new Workout({
        name,
        sets,
        duration
    });

    // Save workout in the database
    workout
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Workout."
            });
        });
};

// Retrieve all Workouts from the database.
exports.findAll = (req, res) => {
    const {name} = req.query;
    const condition = name ? {name} : {};

    Workout.find(condition)
        .populate({path: 'sets', populate: {path: 'exercise_id'}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving workouts."
            });
        });
};

// Find a single Workout with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Workout.findById(id)
        .populate({path: 'sets', populate: {path: 'exercise_id'}})
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found Workout with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving Workout with id=" + id});
        });
};

// Update a Workout by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Workout.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Workout with id=${id}. Maybe Workout was not found!`
                });
            } else res.send({message: "Workout was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Workout with id=" + id
            });
        });
};

// Delete a Workout with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Workout.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Workout with id=${id}. Maybe Workout was not found!`
                });
            } else {
                res.send({
                    message: "Workout was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Workout with id=" + id
            });
        });
};

// Delete all Workouts from the database.
exports.deleteAll = (req, res) => {
    Workout.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Workouts were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all workouts."
            });
        });
};
