import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Favorites = db.define(
  'favorites',
  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    uni_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync({ alter: true });
})();

export default Favorites;
