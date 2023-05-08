const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const express = require('express');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');

routes.post('/signup', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

routes.post('/signin', express.json(), celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required().alphanum(),
  }),
}), login);

routes.use('/users', auth, usersRouter);
routes.use('/movies', auth, moviesRouter);

routes.use('*', (req, res, next) => {
  next(new NotFoundError('По указанному url ничего нет'));
});

module.exports = routes;
