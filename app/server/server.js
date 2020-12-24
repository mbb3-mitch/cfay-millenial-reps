const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
module.exports = {
    startServer(is_test = false) {

        let corsOptions = {
            origin: "http://localhost:8081"
        };

        app.use(cors(corsOptions));

// parse requests of content-type - application/json
        app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
        app.use(bodyParser.urlencoded({extended: true}));

        if (!is_test){
            require("./connect-db")(is_test)
        }
        require("../routes")(app)

// set port, listen for requests
        const PORT = is_test ? 6969 : (process.env.PORT || 8080);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    },
    app
}
