const db = require("../models");
const Set = db.sets;
const Exercise = db.exercises;
const Workout = db.workouts;

// Create and Save a new Set
exports.create = async (req, res) => {
    let {exercise_id, reps = 0, duration = 0, workout_id} = req.body;
    // Validate request
    if (!req.body.exercise_id) {
        res.status(400).send({message: "Invalid Exercise"});
        return;
    }
    if (!req.body.exercise_id) {
        res.status(400).send({message: "Invalid Exercise"});
        return;
    }

    if (!workout_id) {
        let activeWorkout = await Workout.findOne({active: true})
        if (!activeWorkout) {
            activeWorkout = Workout({
                name: `Untitled Workout ${new Date().toLocaleString()}`,
                active: true,
                start: new Date()
            })
        }

        workout_id = activeWorkout.id
    }


    // Create a Set
    set = new Set({
        exercise_id,
        reps,
        duration,
        workout_id
    });

    // Save set in the database
    try {
        set = await set.save()
        await Workout.findByIdAndUpdate(
            set.workout_id,
            { $push: { sets: set.id } },
            { new: true }
        );

        res.send(set);
    } catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Set."
        });
    }

};

// Retrieve all Sets from the database.
exports.findAll = async (req, res) => {
    const {workout_id} = req.query;
    const condition = workout_id ? {workout_id} : {};

    Set.find(condition)
        .populate('exercise_id')
        .populate('workout_id')
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
exports.findOne = async (req, res) => {
    const id = req.params.id;

    Set.findById(id)
        .populate('exercise_id')
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
exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Set.findByIdAndUpdate(id, req.body)
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
exports.delete = async (req, res) => {
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
exports.deleteAll = async (req, res) => {
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
