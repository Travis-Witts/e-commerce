// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: dataType.INTEGER,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: dataType.STRING,
      notNull: true,
    },
    price: {
      type: dataType.DECIMAL,
      notNull: true,
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: dataType.INTEGER,
      notNull: true,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      }
    },
    category_id: {
      type: dataType.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
