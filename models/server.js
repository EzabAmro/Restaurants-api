const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");

const {
    dbConnection
} = require("../database/config");

class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.myRoutes = {
            restaurantsRoutePath: "/api/restaurants",
            citiesRoutePath: "/api/cities",
            tablesRoutePath: "/api/tables"
        };

        this.connectMongoDB();

        this.middlewares();

        this.routes();
    }
 
    middlewares () {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
        this.app.use(fileupload(
            {
                useTempFiles: true,
                tempFileDir: "/tmp/"
            }
        ));
    }
    
    routes () {
        this.app.use(this.myRoutes.restaurantsRoutePath, require("../routes/restaurants.routes"));
        this.app.use(this.myRoutes.citiesRoutePath, require("../routes/city.routes"));
        this.app.use(this.myRoutes.tablesRoutePath, require("../routes/tables.routes"));
    }
    
    startListener () {
        this.app.listen(this.port, () => console.log(`Server online on port ${this.port}`));
    }

    async connectMongoDB () {
        await dbConnection();
    }

}





module.exports = Server;

