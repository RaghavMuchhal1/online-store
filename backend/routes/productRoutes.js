const express = require('express');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const router = express.Router();

// Create a new product (Admin only)
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const { name, description, price } = req.body;

    try {
        const product = await Product.create({
            name,
            description,
            price,
            createdBy: req.user.email
        });
        res.status(201).json({ message: 'Product created', product });
    } catch (err) {
        res.status(500).json({ message: 'Error creating product', error: err.message });
    }
});

// Get all products (Public)
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching products', error: err.message });
    }
});

// Delete a product (Admin only)
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.destroy({ where: { id } });
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err.message });
    }
});
// Update a product (Admin only)
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        await product.save();

        res.status(200).json({ message: 'Product updated', product });
    } catch (err) {
        res.status(500).json({ message: 'Error updating product', error: err.message });
    }
});
// Filter products by admin username
router.get('/filter/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const products = await Product.findAll({ where: { createdBy: username } });
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found for this admin' });
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Error filtering products', error: err.message });
    }
});


module.exports = router;
