const {Router} = require("express");
const {check} = require("express-validator");

const {
    addRestaurant, updateRestaurant, getRestaurants, deleteRestaurant, getCustomRestaurantByLetter, getCustomRestaurantByCity, updateRestaurantImage
} = require("../controllers/restaurant.controller");
const { cityExists } = require("../helpers/db-validator-city");
const { restaurantExists } = require("../helpers/db-validator-restaurant");
const { validateFields } = require("../middlewares/validate-fields");
const { validateFlieUploades } = require("../middlewares/validate-file");

const router = Router();


router.get("/", getRestaurants);

router.get("/getByLetter/:keyLetter", getCustomRestaurantByLetter);


router.get("/getByCity/:cityId", [
    check("cityId", "Not is a valid mongo id").isMongoId(),
    check("cityId").custom(cityExists),
    validateFields
], getCustomRestaurantByCity);

router.post("/", [
    check("name", "name is required").not().isEmpty(),
    check("description", "description is required").not().isEmpty(),
    check("address", "address is required").not().isEmpty(),
    check("city", "city is required").not().isEmpty(),
    validateFlieUploades,
    validateFields
], addRestaurant);

router.put("/:id", [
    check("id", "Not is a valid mongo id").isMongoId(),
    check("id").custom(restaurantExists),
    validateFields
], updateRestaurant);

router.put("/image/:id", [
    check("id", "Not is a valid mongo id").isMongoId(),
    check("id").custom(restaurantExists),
    validateFlieUploades,
    validateFields
], updateRestaurantImage);

router.delete("/:id", [
    check("id", "Not is a valid mongo id").isMongoId(),
    check("id").custom(restaurantExists),
    validateFields
], deleteRestaurant);

module.exports = router;






