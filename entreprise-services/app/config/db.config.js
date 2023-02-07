const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  define: { timestamps: false },
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.entreprise = require('../model/entreprise.js')(sequelize, Sequelize);
db.result = require('../model/result.js')(sequelize, Sequelize);



db.entreprise.hasMany(db.result, { foreignKey: 'entrepriseId', as: 'Entreprises' });
db.result.belongsTo(db.entreprise, { foreignKey: 'entrepriseId' });


module.exports = db;