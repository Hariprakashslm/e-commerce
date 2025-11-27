const sequelize = require('../config/db');

const sequelizeSync = () => {
  sequelize.sync().then(() => {
    console.log('MySQL Connected & Tables Synced');
  });
};

exports.sequelizeSync = sequelizeSync;
