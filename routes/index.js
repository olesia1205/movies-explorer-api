const routes = require('express').Router();
const express = require('express');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');
const { validateSignupUser, validateSigninUser } = require('../utils/requestValidation');

routes.post('/signup', express.json(), validateSignupUser, createUser);
routes.post('/signin', express.json(), validateSigninUser, login);

routes.use('/users', auth, usersRouter);
routes.use('/movies', auth, moviesRouter);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('По указанному url ничего нет'));
});

module.exports = routes;
