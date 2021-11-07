const {Schema, model} = require("mongoose");


const citySchema = Schema(
    {
        name: {
            type: String,
            required: [true, "The name is required"]
        }
    }
);

citySchema.methods.toJSON = function () {
    const {__v, _id, ...cityRestaurant} = this.toObject();
    cityRestaurant.id = _id;
    return cityRestaurant;
}


module.exports = model("City", citySchema);