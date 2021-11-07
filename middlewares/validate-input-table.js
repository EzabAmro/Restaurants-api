const Table = require("../models/table");
const Restaurant = require("../models/restaurant");
const {request, response} = require("express");

const validateTotalAmountTables = async (req = request, res = response, next) => {

    const {date} = req.body;
    const totalAmount = await Table.countDocuments(
        {
            $and: [{state: true}, {date}]
        }
    );
    if (totalAmount >= 20) return res.status(400).json(
        {
            ok: false,
            msg: `The total number of tables reserved fot the day ${date} in all restaurants is full`
        }
    );

    next();
}

const validateTotalAmountTablesPerRestaurant = async (req = request, res = response, next) => {

    const {idRestaurant, date} = req.body;
    console.log(idRestaurant);
    const [restaurant, totalAmount] = await Promise.all(
        [
            Restaurant.findById(idRestaurant),
            Table.countDocuments(
                {
                    $and: [{restaurant: idRestaurant}, {date}, {state: true}]
                }
            )
        ]
    );
    if (totalAmount >= 15) return res.status(400).json(
        {
            ok: false,
            msg: `The total number of tables reserved for the day ${date} in the restaurant ${restaurant.name} is full`
        }
    );

    next();
}

module.exports = {
    validateTotalAmountTables,
    validateTotalAmountTablesPerRestaurant
}