const express = require("express");
const categoryController = require("../controllers/categoryController");
const { requireSignin } = require("../middleware/requireSignin");
const Access = require("../middleware/userAdminAccess");

const multer=require('multer');
const shortid=require('shortid');
const path=require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate()+' - '+file.originalname)
    }
  })
  const upload=multer({storage});

const router = express.Router();

router.post(
    "/category/create",
    requireSignin,
    Access.isAdmin,
    upload.single('categoryImage'),
    categoryController.createCategory
);
router.get("/category/getCategory", categoryController.getCategory);

module.exports = router;
