const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include: "products"
    });
    res.status(200).json(allTags);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagSearch = await Tag.findByPk(req.params.id, {
      include: "products"
    });
    res.status(200).json(tagSearch);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(`Updated tag name to: ${req.body.tag_name} where ID is: ${req.params.id}`);
  } catch (error) {
  console.log(error);
  res.status(400).json(error);    
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(`Deleted tag where ID is: ${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
