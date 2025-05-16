const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { swaggerUi, swaggerDocs } = require('./swagger/swaggerConfig');

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

module.exports = app;
