const express = require("express");
const addItemsToCartController = require("../controllers/addItemsToCartController");
const { requireSignin } = require("../middleware/requireSignin");
const Access = require("../middleware/userAdminAccess");

const router = express.Router();

router.post(
    "/user/cart/addtocart",
    requireSignin,
    Access.isUser,
    addItemsToCartController.addItemsToCart
);

module.exports = router;
