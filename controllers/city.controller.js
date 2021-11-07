const { request, response } = require("express");


const City = require("../models/city");

const getCities = async (req = request, res = response) => {

    const { limit = 5, skip = 0 } = req.query;
    const queryRule = { state: true };

    //const restaurants = await Restaurant.find(queryRule).limit(limit).skip(skip);
    const [cities, amountCities] = await Promise.all(
        [
            City.find(queryRule).limit(limit).skip(skip),
            City.countDocuments(queryRule)
        ]
    );

    res.json(
        {
            ok: true,
            amountCities,
            cities
        }
    );
}

const getCityById = async (req = request, res = response) => {

    const { id } = req.params;

    const cityFound = await City.findById(id);

    res.json(
        {
            ok: true,
            cityFound
        }
    );

}


const addCity = async (req = request, res = response) => {

    const {
        name
    } = req.body;


    const city = new City(
        {
            name
        }
    );

    const cityCreated = await city.save();

    res.json(
        {
            ok: true,
            cityCreated
        }
    );
}


module.exports = {
    getCities,
    getCityById,
    addCity
}


