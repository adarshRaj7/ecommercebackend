const Cart = require("../models/cartModel");

exports.addItemsToCart = (req, res) => {
  Cart.findOne({ user: req.user._id })
    .then((cart) => {
      if (cart) {
        console.log("Cart already present");
        const toBeAdded = req.body.cartItems.product;
        const isAdded = cart.cartItems.find((c) => c.product == toBeAdded);
        let condition, updation;
        if (isAdded) {
          condition = { user: req.user._id, "cartItems.product": toBeAdded };
          updation = {
            $set: {
              "cartItems.$": {
                ...req.body.cartItems,
                quantity: isAdded.quantity + req.body.cartItems.quantity,
              },
            },
          };
          console.log("item already added");
        } else {
          console.log("New product, adding");
          condition = { user: req.user._id };
          updation = {
            $push: {
              cartItems: req.body.cartItems,
            },
          };
        }
        Cart.findOneAndUpdate(condition, updation)
          .then((resp) => {
            res.status(200).json(resp);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      } else {
        console.log("Creating new cart");
        Cart.create({
          user: req.user._id,
          cartItems: [req.body.cartItems],
          price: req.body.price,
        })
          .then((resp) => {
            res.status(200).json(resp);
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      }
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
