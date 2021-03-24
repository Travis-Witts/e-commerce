const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
      type: dataType.INTEGER,
      notNull: true,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: dataType.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      }
    },
    tag_id: {
      type: dataType.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
