const Product = require("../models/productModel");
const multer = require("multer");
const shortid = require("shortid");
const slugify = require("slugify");
// function createProduct(products, cat = null) {
//   //   res.status(200).json({ file: req.files, body: req.body });s
//   const { name, price, description, category, quantity, createdBy } = products;
//   let productImages = [];
//   if (req.files.length > 0) {
//     productImages = req.files.map((file) => {
//       return { img: file.filename };
//     });
//   }
//   const product = new Product({
//     name: req.body.name,
//     slug: slugify(name),
//     price,
//     description,
//     productImages,
//     category,
//     quantity,
//     createdBy: req.user._id,
//   });

//   product.save((error, product) => {
//     if (error) return res.status(400).json({ error });
//     if (product) res.status(201).json({ product });
//   });
// }

exports.createProduct = (req, res) => 
{
  let productImages = [];
  if (req.files.length > 0) 
  {
    productImages = req.files.map((file) => {
      // productImages.push(file);
      console.log(productImages);
      return { img: file.filename };
    });
  }
  // res.status(200).json(req.files)
  Product.create({
    name: req.body.name,
    slug: slugify(req.body.name),
    price: req.body.price,
    description: req.body.description,
    productPictures: productImages,
    category: req.body.category,
    quantity: req.body.quantity,
    createdBy: req.user._id,
  })
    .then((resp) => {
      res.status(201).json({resp, message: "Product created successfully" });
      console.log(resp);
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
