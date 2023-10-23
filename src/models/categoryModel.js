const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require,
            trim: true,
        },
        slug: {
            type: String,
            require,
            unique: true,
        },
        categoryImage:{
            type: String
        },
        parentId: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
