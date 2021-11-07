const City = require("../models/city");

const cityExists = async (id = "") => {
    const cityFound = await City.findById(id);
    if (!cityFound) throw new Error(`City with id: ${id} not found`);
}


module.exports = {
    cityExists
}


