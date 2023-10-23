const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/adminAuthController");
const {
    isRequestValidated,
    validateSignupRequest,
    validateSigninRequest,
} = require("../../validators/authValidator");
const { requireSignin } = require("../../middleware/requireSignin");

router.post(
    "/admin/signin",
    validateSigninRequest,
    isRequestValidated,
    adminController.signin
);

router.post(
    "/admin/signup",
    validateSignupRequest,
    isRequestValidated,
    adminController.signup
);
router.post("/admin/signout", isRequestValidated, adminController.signout);

router.post("/profile", requireSignin, (req, res) => {
    res.status(200).json({
        user: "profile",
    });
});

module.exports = router;
