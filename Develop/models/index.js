// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: "category_id",
})
// Products belongsTo Category

Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
})
// Categories have many Products

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: "tags",
})

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: "products"
})

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
