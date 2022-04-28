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
      res.status(404).json({ message: 'No existing category with this given ID.' });
      return;
    }
    res.json(category);
  })
  .catch(err => res.status(500).json(err));
});

// create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
  .then(newCategory => res.json(newCategory))
  .catch(err => res.status(400).json(err));
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedCategory => {
    if(!updatedCategory) {
      res.status(404).json({ message: 'No existing category with this given ID.' })
    }
    res.json(updatedCategory);
  })
  .catch(err => res.status(500).json(err));
});

// delete a category 
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(category => {
    if(!category) {
      res.status(404).json({ message: 'No existing category with this given ID.' })
    }
    res.json(category);
  })
  .catch(err => res.status(500).json(err));
});

module.exports = router;
