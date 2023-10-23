const { default: slugify } = require("slugify");
const Category = require("../models/categoryModel");

function createCategory(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId === undefined);
  } else {
    category = categories.filter((cat) => cat.parentId === parentId);
  }

  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      categoryImage: cate.categoryImage,
      children: createCategory(categories, cate._id.toString()),
    });
  }

  return categoryList;
}
exports.createCategory = (req, res) => {
  let newCategory = {
    name: req.body.name,
    slug: slugify(req.body.name),
    parentId: req.body.parentId ? req.body.parentId : undefined,
  };
  if (req.file) {
    newCategory.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }
  console.log(newCategory);
  Category.create(newCategory)
    .then((resp) => {
      res.status(201).json({ message: "category created successfully" });
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json( err );
    });
};

exports.getCategory = async (req, res) => {
  const categories = await Category.find();
  if (categories) {
    const categoryList = createCategory(categories);
    res.status(200).json({ categoryList });
  } else {
    res.status(400).json({ message: "no data" });
  }
};
