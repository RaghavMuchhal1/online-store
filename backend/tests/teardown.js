module.exports = async () => {
    const { sequelize } = require('../config/database');
    await sequelize.close();
};
