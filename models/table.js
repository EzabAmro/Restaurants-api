const {Schema, model} = require("mongoose");


const tableSchema = Schema(
    {
        name: {
            type: String,
            requires: [true, "Table name is required"]
        },
        restaurant: {
            type: Schema.ObjectId,
            ref: "Restaurant",
            required: [true, "Restaurant reference is required"]
        },
        date: {
            type: Date,
            required: [true, "Date is required"]
        },
        state: {
            type: Boolean,
            default: true
        }
    }
);

tableSchema.methods.toJSON = function () {
    const {__v, _id, ...dataTable} = this.toObject();
    dataTable.id = _id;
    return dataTable;
}


module.exports = model("Table", tableSchema);