const express = require("express");
const router = express.Router();
const userController = require("../controllers/authController");
const {
    validateSignupRequest,
    isRequestValidated,
    validateSigninRequest,
} = require("../validators/authValidator");
const { requireSignin } = require("../middleware/requireSignin");

router.post(
    "/signin",
    validateSigninRequest,
    isRequestValidated,
    userController.signin
);

router.post(
    "/signup",
    validateSignupRequest,
    isRequestValidated,
    userController.signup
);

router.post("/profile", requireSignin, (req, res) => {
    res.status(200).json({
        user: "profile",
    });
});

module.exports = router;
