const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("Database connection online");
    } catch (error) {
        throw new Error(`Error -> ${error}`);
    }
}


module.exports = {
    dbConnection
};