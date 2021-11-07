const Table = require("../models/table");


const tableExists = async (id = "") => {
    const tableFound = await Table.findById(id);
    if (!tableFound) throw new Error(`Reserve table with id: ${id} not found`);
}

module.exports = {
    tableExists
}