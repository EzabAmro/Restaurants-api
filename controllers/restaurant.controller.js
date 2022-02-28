const { request, response } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const Restaurant = require("../models/restaurant");

const getRestaurants = async (req = request, res = response) => {
    //const { limit = 5, skip = 0 } = req.query;
    const queryRule = { state: true };
    //const restaurants = await Restaurant.find(queryRule).limit(limit).skip(skip);
    /*const [restaurants, amountRestaurants] = await Promise.all(
        [
            Restaurant.find(queryRule).limit(Number(limit)).skip(Number(skip)).populate("city"),
            Restaurant.countDocuments(queryRule)
        ]
    );*/
    const restaurants = await Restaurant.find(queryRule).populate("city")
    res.json(
        {
            ok: true,
            body: restaurants
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

    try {
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

        return res.json(
            {
                ok: true,
                body: {
                    name,
                    description,
                    address,
                    city: null,
                    image: secure_url
                }
            }
        );
    } catch (error) {
        console.log(`Error -> ${error}`)
        return res.status(500).json(
            {
                ok: false,
                message: "Something went wrong"
            }
        );
    }

}

const updateRestaurant = async (req = request, res = response) => {

    const { id } = req.params;
    const dataRestaurant = req.body;

    const {
        name,
        description,
        address,
        city,
        image
    } = await Restaurant.findByIdAndUpdate(id, dataRestaurant);

    res.json(
        {
            ok: true,
            body: {
                name,
                description,
                address,
                city: null,
                image
            }
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
    const {
        name,
        description,
        address,
        city,
        image
    } = await model.save();

    res.json(
        {
            ok: true,
            body: {
                name,
                description,
                address,
                city: null,
                image
            }
        }
    );
}

const deleteRestaurant = async (req = request, res = response) => {
    const { id } = req.params;
    //const restaurantDeleted = await Restaurant.findByIdAndDelete(id);
    const {
        name,
        description,
        address,
        city,
        image
    } = await Restaurant.findByIdAndUpdate(id, { state: false });
    res.json(
        {
            ok: true,
            body: {
                name,
                description,
                address,
                city: null,
                image
            }
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





