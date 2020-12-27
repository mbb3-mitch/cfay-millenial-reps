module.exports = app => {
    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to CFAY Millenial Reps." });
    });

    require("./exercise.routes")(app);
    require("./exercise.set.routes")(app);
    require("./workout.routes")(app);
}
