const config = require("../config/db.config.js");

const dotenv = require('dotenv');
dotenv.config()

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.databases.Main.database,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: config.databases.Main.host,
    dialect: config.databases.Main.dialect,
    operatorsAliases: false,

    pool: {
      max: config.databases.Main.pool.max,
      min: config.databases.Main.pool.min,
      acquire: config.databases.Main.pool.acquire,
      idle: config.databases.Main.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.countries = require("../models/countries.model")(sequelize, Sequelize);

module.exports = db;