const express = require("express");
const router = express.Router();
const { initialData } = require("../../controllers/admin/initialDataController");

router.post("/initialdata",  initialData);

module.exports = router;
