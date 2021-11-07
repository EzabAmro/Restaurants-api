const Table = require("../models/table");
const {request, response} = require("express");

const getAllTablesReserve = async (req = request, res = response) => {

    const [amountTables, reserveTables] = await Promise.all(
        [
            Table.countDocuments({state: true}),
            Table.find({state: true}).populate("restaurant", "name")
        ]
    );
    res.json(
        {
            ok: true,
            amountTables,
            reserveTables
        }
    );

}

const reserveTable = async (req = request, res = response) => {

    const {idRestaurant, date, name} = req.body;
    const table = new Table(
        {
            restaurant: idRestaurant,
            name, 
            date
        }
    );
    const tableReserved = await table.save();
    res.json(
        {
            ok: true,
            tableReserved
        }
    );

}

const deleteReserveTable = async (req = request, res = response) => {
    const {id} = req.params;
    const tableDeleted = await Table.findByIdAndUpdate(id, {state: false});
    res.json(
        {
            ok: true, 
            tableDeleted
        }
    );
}

module.exports = {
    reserveTable,
    getAllTablesReserve,
    deleteReserveTable
}