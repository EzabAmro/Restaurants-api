const {Schema, model} = require("mongoose");


const citySchema = Schema(
    {
        name: {
            type: String,
            required: [true, "The name is required"]
        }
    }
);


module.exports = model("City", citySchema);