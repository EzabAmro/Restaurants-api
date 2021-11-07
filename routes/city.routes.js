const {Router} = require("express");
const { check } = require("express-validator");

const { getCities, getCityById, addCity } = require("../controllers/city.controller");
const { cityExists } = require("../helpers/db-validator-city");
const {validateFields} = require("../middlewares/validate-fields");

const router = Router();


router.get("/", getCities);

router.get("/:id", [
    check("id", "Not is a valid mongo id").isMongoId(),
    check("id").custom(cityExists),
    validateFields
], getCityById);

router.post("/", addCity);



module.exports = router;






