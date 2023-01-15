import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from '../helpers/isEmail.js';
import moment from 'moment';

export const getUsers = async (req, res) => {
  console.log('ROLES:', req.roles);
  if (!req.roles.includes('ROLE_ADMIN')) {
    return res.status(403).json({ msg: 'Not Authorized' });
  }
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'email'],
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (!name) {
    return res.status(400).json({ msg: 'Please provide a name' });
  }
  if (!email) {
    return res.status(400).json({ msg: 'Please provide an email' });
  }
  if (!password) {
    return res.status(400).json({ msg: 'Please provide a password' });
  }
  if (!confPassword) {
    return res
      .status(400)
      .json({ msg: 'Please provide password confirmation' });
  }
  if (name && name.length < 3) {
    return res.status(400).json({ msg: 'Name is too short (min length 3)' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ msg: 'Invalid Email' });
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: 'Password and Confirm Password dont match' });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (user && user.length > 0) {
      return res
        .status(422)
        .json({ msg: 'User with that email already exists' });
    }
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      roles: 'ROLE_USER',
    });

    const createdUser = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });

    const createdUserId = createdUser[0].id;
    const createdName = createdUser[0].name;
    const createdEmail = createdUser[0].email;
    const createdRoles = createdUser[0].roles;
    const accessToken = jwt.sign(
      {
        id: createdUserId,
        name: createdName,
        email: createdEmail,
        roles: createdRoles,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );
    return res
      .status(200)
      .json({ msg: 'Register Sucessful', token: accessToken });
    // return res.status(200).json({ msg: 'Register Sucessful' });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  console.log('REQ.body: ', req.body);
  console.log('req Params: ', req.params);
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    console.log('user pass : ', user[0].password);
    if (!req.body.password) {
      res.status(400).json({ msg: 'No password provided' });
    }
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: 'Wrong Password' });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const roles = user[0].roles;
    const accessToken = jwt.sign(
      { userId, name, email, roles },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );
    const refreshToken = jwt.sign(
      { userId, name, email, roles },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '7d',
      }
    );
    await Users.update(
      {
        refresh_token: refreshToken,
        last_login: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
      },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ msg: 'Login Sucessful', token: accessToken });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: 'Email not found' });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await Users.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await Users.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
};
