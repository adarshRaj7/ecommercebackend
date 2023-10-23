const Admin = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => { 
    Admin.findOne({ email: req.body.email.toLowerCase() })
        .then( async (user) => {
            if (user) {
                return res.status(200).json({
                    message: "admin already exist",
                });
            } else {
                const { firstName, lastName, email, password } = req.body;
                const hash_password=await bcrypt.hash(password, 10 );
                Admin.create({
                    firstName,
                    lastName,
                    email,
                    hash_password,
                    userName: Math.random().toString(),
                    role: "admin",
                })
                    .then((resp) => {
                        res.status(200).json({
                            message: "admin has been created",
                        });
                    })
                    .catch((err) => {
                        res.send(err);
                    });
            }
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.signin = (req, res) => {
    Admin.findOne({ email: req.body.email.toLowerCase() })
        .then((user) => {
            if (!user) {
                console.log("user not found");
                return res.status(400).json({
                    error: "user not found",
                });
            }
            if (
                bcrypt.compareSync(req.body.password, user.hash_password) &&
                user.role === "admin"
            ) {
                const token = jwt.sign(
                    { _id: user._id, role: user.role },
                    process.env.JWT_SECRET,
                    { expiresIn: "1h" }
                );

                const { _id, firstName, lastName, email, role, fullName } =
                    user;
                res.cookie = ("token", token, { expiresIn: "1h" });

                res.status(200).json({
                    token,
                    user: {
                        _id,
                        firstName,
                        lastName,
                        email,
                        role,
                        fullName,
                    },
                });
            } else {
                console.log("password invalid");
                res.status(400).json({
                    error: "password invalid",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                err,
            });
        });
};

exports.signout = (req, res) => {
    console.log(res);
    res.clearCookie("token");
    res.status(200).json({ message: "signout successfully" });
};
