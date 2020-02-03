require('dotenv').config(); // eslint-disable-line
/*
|--------------------------------------------------------------------------
| Default Database Connection Name
|--------------------------------------------------------------------------
| info: https://sequelize.org/master/manual/dialects.html
| type: mysql | mariadb | sqlite | postgres | mssql
| default: postgres
|
*/
// const dialect = process.env.DB_CONNECTION || 'postgres';

module.exports = {
  dialect: process.env.DB_CONNECTION || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_DATABASE || 'postgres',
  port: +process.env.DB_PORT || '5432',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
