const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.test = dbConfig.test;
db.tutorials = require("./tutorial.model.js")(mongoose);
db.exercises = require("./exercise.model.js")(mongoose);
db.sets = require("./exercise.set.model.js")(mongoose);
db.workouts = require("./workout.model")(mongoose);

module.exports = db;
