import Favorites from '../models/FavoritesModel.js';
import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from '../helpers/isEmail.js';
import moment from 'moment';

export const getFavorites = async (req, res) => {
  const user = await Users.findOne({
    where: {
      email: req.email,
    },
  });

  if (!user || user.length < 1) {
    return res.status(404).json({ msg: "User with that email doesn't exist" });
  }

  try {
    const favorites = await Favorites.findAll({
      where: {
        user_id: user.id,
      },
    });

    res.json(favorites);
  } catch (error) {
    console.log(error);
  }
};

export const addFavorite = async (req, res) => {
  const { uni_id } = req.body;
  if (!uni_id) {
    return res.status(400).json({ msg: 'Please provide a uni_id' });
  }

  const user = await Users.findOne({
    where: {
      email: req.email,
    },
  });

  if (!user || user.length < 1) {
    return res.status(404).json({ msg: "User with that email doesn't exist" });
  }

  try {
    const favorites = await Favorites.findAll({
      where: {
        user_id: user.id,
        uni_id: uni_id,
      },
    });
    if (favorites && favorites.length > 0) {
      return res
        .status(422)
        .json({ msg: 'Favorite Uni already exists for this user' });
    } else {
      await Favorites.create({
        user_id: user.id,
        uni_id: uni_id,
      });

      const favorites = await Favorites.findAll({
        where: {
          user_id: user.id,
        },
      });

      return res.status(200).json(favorites);
    }
  } catch (error) {
    console.log(error);
  }
};

export const delFavorite = async (req, res) => {
  const { uni_id } = req.body;
  if (!uni_id) {
    return res.status(400).json({ msg: 'Please provide a uni_id' });
  }

  const user = await Users.findOne({
    where: {
      email: req.email,
    },
  });

  if (!user || user.length < 1) {
    return res.status(404).json({ msg: "User with that email doesn't exist" });
  }

  try {
    const favorite = await Favorites.findOne({
      where: {
        user_id: user.id,
        uni_id: uni_id,
      },
    });
    if (!favorite || favorite.length < 1) {
      return res
        .status(404)
        .json({ msg: 'Favorite Uni with that id was not found' });
    } else {
      await Favorites.destroy({
        where: {
          id: favorite.id,
        },
      });

      const favorites = await Favorites.findAll({
        where: {
          user_id: user.id,
        },
      });

      return res.status(200).json(favorites);
    }
  } catch (error) {
    console.log(error);
  }
};
