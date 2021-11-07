const {Router} = require("express");
const {check} = require("express-validator");
const { reserveTable, getAllTablesReserve, deleteReserveTable } = require("../controllers/table.controller");
const { restaurantExists } = require("../helpers/db-validator-restaurant");
const { tableExists } = require("../helpers/dv-validator-table");
const { validateFields } = require("../middlewares/validate-fields");
const { validateTotalAmountTables, validateTotalAmountTablesPerRestaurant } = require("../middlewares/validate-input-table");


const router = Router();


router.get("/", getAllTablesReserve);

router.post("/", [
    check("idRestaurant", "Not is a valid mongo id").isMongoId(),
    check("idRestaurant").custom(restaurantExists),
    validateTotalAmountTables,
    validateTotalAmountTablesPerRestaurant,
    validateFields
], reserveTable);

router.delete("/:id", [
    check("id", "Not is a valid mongo id").isMongoId(),
    check("id").custom(tableExists),
    validateFields
], deleteReserveTable);



module.exports = router;