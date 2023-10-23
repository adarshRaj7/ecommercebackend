const Admin = require("../../models/userModel");

exports.delete = (req, res) => {
  Admin.findOne({ email: req.body.email }).then((admin) => {
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    Admin.deleteOne({ email: req.body.email })
      .then((resp) => {
        res.status(200).json({ message: "Admin Deleted successfully" });
      })
      .catch((error) => {
        res.status(500).json(error);
        console.log("Error");
      });
  });
};
