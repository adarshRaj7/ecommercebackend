const Category = require("../../models/categoryModel");
const Product = require("../../models/productModel");

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

exports.initialData = async (req, res) => {
  const categories = await Category.find();
  const products = await Product.find().select(['id',"name",'price','quantity','slug','description','productPictures','category']);
  res.status(200).json({
    categories:createCategory(categories),
    products,
  });
};
