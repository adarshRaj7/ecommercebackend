const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            require,
            trim: true,
            min: 3,
            max: 50,
        },
        lastName: {
            type: String,
            require,
            trim: true,
            min: 3,
            max: 50,
        },
        userName: {
            type: String,
            require,
            trim: true,
            unique: true,
            index: true,
            lowercase: true,
        },
        hash_password: {
            type: String,
            require,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        contactNumber: {
            trpe: String,
        },
        profilePicture: {
            type: String,
        },
        email: {
            type: String,
            require,
            trim: true,
            unique: true,
            lowercase: true,
        },
    },
    { timestamps: true }
);

// userSchema.virtual("password").set(function (password) {
//     this.hash_password = bcrypt.hashSync(password, 10);
// });

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate: async function (password) {
        await bcrypt.compareSync(password, this.hash_password);
    },
};

module.exports = mongoose.model("User", userSchema);
