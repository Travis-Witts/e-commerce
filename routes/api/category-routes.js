const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories =  await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categorySearch = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    res.status(200).json(categorySearch);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    console.log(error);
  res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update({
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(`Category with the ID: ${req.params.id} name updated to ${req.body.category_name}`);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
  const deletedCategory = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(`Category with the ID: ${req.params.id} has been deleted.`);
} catch (error) {
  console.log(error);
  res.status(400).json(error);
}
});

module.exports = router;
