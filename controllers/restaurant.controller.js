const { request, response } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Restaurant = require("../models/restaurant");

const getRestaurants = async (req = request, res = response) => {
    const { limit = 5, skip = 0 } = req.query;
    const queryRule = { state: true };
    //const restaurants = await Restaurant.find(queryRule).limit(limit).skip(skip);
    const [restaurants, amountRestaurants] = await Promise.all(
        [
            Restaurant.find(queryRule).limit(Number(limit)).skip(Number(skip)).populate("city"),
            Restaurant.countDocuments(queryRule)
        ]
    );
    res.json(
        {
            ok: true,
            amountRestaurants,
            restaurants
        }
    );
}

const getCustomRestaurantByLetter = async (req = request, res = response) => {
    const { keyLetter } = req.params;

    const regex = new RegExp(keyLetter, "i");

    const restaurantsMatch = await (await Restaurant.find({ state: true }).populate("city", "name")).filter((restaurant) => restaurant.name[0].toLowerCase() === keyLetter.toLowerCase());
    //const restaurantsMatch = await Restaurant.find({name: regex}).populate("city", "name");

    res.json(
        {
            ok: true,
            restaurantsMatch
        }
    );


}

const getCustomRestaurantByCity = async (req = request, res = response) => {
    const { cityId } = req.params;
    const restaurantsMatch = await Restaurant.find({ city: cityId }).populate("city", "name");
    res.json(
        {
            ok: true,
            restaurantsMatch
        }
    );
}


const addRestaurant = async (req = request, res = response) => {

    const {
        name,
        description,
        address,
        city
    } = req.body;

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    const restaurant = new Restaurant(
        {
            name,
            description,
            address,
            city,
            image: secure_url
        }
    );

    const restaurantCreated = await restaurant.save();

    res.json(
        {
            ok: true,
            restaurantCreated
        }
    );
}

const updateRestaurant = async (req = request, res = response) => {

    const { id } = req.params;
    const dataRestaurant = req.body;

    const restaurantUpdated = await Restaurant.findByIdAndUpdate(id, dataRestaurant);

    res.json(
        {
            ok: true,
            restaurantUpdated
        }
    );
}

const updateRestaurantImage = async (req = request, res = response) => {

    const { id } = req.params;
    const model = await Restaurant.findById(id);

    const cutNameImage = model.image.split("/");
    const nameImage = cutNameImage[cutNameImage.length - 1];
    const [idImage, ...extensions] = nameImage.split(".");

    await cloudinary.uploader.destroy(idImage);

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.image = secure_url;
    await model.save();

    res.json(
        {
            ok: true,
            msg: "Image updated successfully"
        }
    );
}

const deleteRestaurant = async (req = request, res = response) => {
    const { id } = req.params;
    //const restaurantDeleted = await Restaurant.findByIdAndDelete(id);
    const restaurantDeleted = await Restaurant.findByIdAndUpdate(id, { state: false });
    res.json(
        {
            ok: true,
            restaurantDeleted
        }
    );
}

module.exports = {
    addRestaurant,
    updateRestaurant,
    getRestaurants,
    deleteRestaurant,
    getCustomRestaurantByCity,
    getCustomRestaurantByLetter,
    updateRestaurantImage
}





