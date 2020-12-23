module.exports = app => {
    // simple route
    app.get("/", (req, res) => {
        res.json({ message: "Welcome to CFAY Millenial Reps." });
    });

    require("./tutorial.routes")(app);
    require("./exercise.routes")(app);
}
