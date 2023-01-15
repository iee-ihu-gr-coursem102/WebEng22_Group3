import express from 'express';
import { getUsers, Register, Login, Logout } from '../controllers/Users.js';
import {
  getFavorites,
  addFavorite,
  delFavorite,
} from '../controllers/Favorites.js';
import { verifyToken } from '../middleware/VerifyToken.js';
import { refreshToken } from '../controllers/RefreshToken.js';

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/favorites', verifyToken, getFavorites);
router.post('/favorites', verifyToken, addFavorite);
router.delete('/favorites', verifyToken, delFavorite);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
