const Restaurant = require("../models/restaurant");


const restaurantExists = async (id = "") => {
    const restaurantFound = await Restaurant.findById(id);
    if (!restaurantFound) throw new Error(`Restaurant with id: ${id} not found`); 
}


module.exports = {
    restaurantExists
};

