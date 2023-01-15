import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Users = db.define(
  'users',
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    roles: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    last_login: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync({ alter: true });
})();

export default Users;
