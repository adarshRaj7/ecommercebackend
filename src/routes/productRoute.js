const express = require("express");
// const categoryController = require("../controllers/categoryController");
const { requireSignin } = require("../middleware/requireSignin");
const Access = require("../middleware/userAdminAccess");
const router = express.Router();
const {createProduct} =require('../controllers/productController')
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

router.post(
    "/product/create",
    requireSignin,
    Access.isAdmin,
    upload.array('productImage'),
    createProduct,
);
// router.get("/category/getCategory", categoryController.getCategory);

module.exports = router;
