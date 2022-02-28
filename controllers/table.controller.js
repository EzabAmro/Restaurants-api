const Table = require("../models/table");
const {request, response} = require("express");

const getAllTablesReserve = async (req = request, res = response) => {

    const [amountTables, reserveTables] = await Promise.all(
        [
            Table.countDocuments({state: true}),
            Table.find({state: true}).populate("restaurant")
        ]
    );
    res.json(
        {
            ok: true,
            body: reserveTables
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
            body: {
                id: tableReserved.id,
                name: tableReserved.name,
                date: tableReserved.date
            }
        }
    );

}

const deleteReserveTable = async (req = request, res = response) => {
    const {id} = req.params;
    const tableDeleted = await Table.findByIdAndUpdate(id, {state: false}).populate("restaurant");
    res.json(
        {
            ok: true, 
            body: {
                id: tableDeleted.id,
                name: tableDeleted.name,
                date: tableDeleted.date
            }
        }
    );
}

module.exports = {
    reserveTable,
    getAllTablesReserve,
    deleteReserveTable
}