const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  Category.findAll({
    // include its associated Products
    include: [Product]
  })
  .then(categories => res.json(categories))
  .catch(err => res.status(500).json(err));
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  })
  .then(category => {
    // if category doesn't exist, return 404 error
    if(!category) {
      res.status(404).json({ message: 'No existing category with the given ID.' });
      return;
    }
    res.json(category);
  })
  .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
