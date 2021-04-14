const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");


router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: Category,
        },
        "tags",
      ],
    });
    res.status(200).json(allProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const productSearch = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
        },
        "tags",
      ],
    });
    res.status(200).json(productSearch);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});


router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds.length) {
        const tagArr = req.body.tagIds.map((tagId) => {
          return {
            product_id: product.id,
            tag_id: tagId,
          };
        });
        return ProductTag.bulkCreate(tagArr);
      }
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      const productIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productIds.includes(tag_id))
        .map((tagId) => {
          return {
            product_id: req.params.id,
            tag_id: tagId,
          };
        });
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedTags) => {
      res.json(updatedTags)})
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(`Product has been deleted with the ID: ${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

module.exports = router;
