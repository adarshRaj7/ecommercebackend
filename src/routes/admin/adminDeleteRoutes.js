const express = require("express");
const router = express.Router();
const adminDelete = require("../../controllers/admin/adminDeleteController");
const Access = require("../../middleware/userAdminAccess");
const { requireSignin } = require("../../middleware/requireSignin");

router.post("/admin/delete", requireSignin, Access.isAdmin, adminDelete.delete);

module.exports = router;
