module.exports = is_test => {
    const db = require("../models");
    db.mongoose
        .connect(is_test ? db.test : db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.debug("Connected to the database!");
        })
        .catch(err => {
            console.debug("Cannot connect to the database!", err);
            process.exit();
        });
}
