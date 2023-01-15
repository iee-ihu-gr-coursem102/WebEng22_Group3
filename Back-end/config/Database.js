import { Sequelize } from 'sequelize';

const db = new Sequelize('sys', 'admin', 'flStFVwuB7ltVsBwb4EN', {
  host: 'vaseis-db.cpytni7rkucj.eu-central-1.rds.amazonaws.com',
  dialect: 'mysql',
});

export default db;
