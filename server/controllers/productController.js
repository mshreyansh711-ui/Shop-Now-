const Product = require('../models/Product');

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    const query = {};
    if (category) query.category = { $regex: category, $options: 'i' };
    if (search)   query.$or = [
      { name:        { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];

    let q = Product.find(query);
    if (sort === 'price_asc')   q = q.sort({ price: 1 });
    else if (sort === 'price_desc') q = q.sort({ price: -1 });
    else if (sort === 'rating')     q = q.sort({ rating: -1 });
    else q = q.sort({ createdAt: -1 });

    res.json(await q);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/products  (used by seed.js)
const createProduct = async (req, res) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getProducts, getProductById, createProduct };
