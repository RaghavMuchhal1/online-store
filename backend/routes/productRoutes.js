const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const { authMiddleware } = require('../middleware/authMiddleware');
const { User } = require('../models/User');

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products (filtered by admin name if provided)
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: adminName
 *         schema:
 *           type: string
 *         description: Filter products by admin name
 *     responses:
 *       200:
 *         description: Returns a list of products
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Server error
 */

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { adminName } = req.query;

    let products;
    if (adminName) {
      // Find the admin user by name
      const admin = await User.findOne({ where: { email: adminName, role: 'admin' } });
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      // Fetch products created by the specified admin
      products = await Product.findAll({ where: { createdBy: admin.id } });
      console.log(`Admin (${adminName}) fetched products`);
    } else if (role === 'admin') {
      // Fetch products created by the logged-in admin
      products = await Product.findAll({ where: { createdBy: userId } });
      console.log(`Admin (ID: ${userId}) fetched products`);
    } else {
      // Fetch all products for customers
      products = await Product.findAll();
      console.log(`Customer (ID: ${userId}) fetched all products`);
    }

    res.json({ products });
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Product created
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const { userId, role } = req.user;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const product = await Product.create({ name, description, price, createdBy: userId });
    res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const { userId, role } = req.user;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const product = await Product.findOne({ where: { id, createdBy: userId } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    await product.save();

    res.json(product);
  } catch (err) {
    console.error('Error updating product:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    if (role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const product = await Product.findOne({ where: { id, createdBy: userId } });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
