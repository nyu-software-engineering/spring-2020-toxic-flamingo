const express = require('express');
const router = require('express-promise-router')();
const { validateBody, schemas } = require('./Helper.js');
const UsersController = require('./UserController.js');
const passport = require('passport');

const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/')
    .post(validateBody(schemas.authSchema), passport.authenticate('local', {session: false}), UsersController.logIn);

router.route('/secret')
    .get(passport.authenticate('jwt', {session: false}), UsersController.secret);

    module.exports = router;

