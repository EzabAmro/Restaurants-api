const {Schema, model} = require("mongoose");


const restaurantSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "The name is required"]
        },
        description: {
            type: String,
            required: [true, "The restaurant descrption is required"]
        },
        address: {
            type: String,
            required: [true, "THe restaurant address is required"]
        },
        city: {
            type: Schema.ObjectId,
            ref: "City",
            required: [true, "City reference is required"]
        },
        image: {
            type: String,
            required: [true, "The image is required"]
        },
        state: {
            type: Boolean,
            default: true
        }
    }
);

restaurantSchema.methods.toJSON = function () {
    const {__v, _id, ...dataRestaurant} = this.toObject();
    dataRestaurant.id = _id;
    return dataRestaurant;
}


module.exports = model("Restaurant", restaurantSchema);