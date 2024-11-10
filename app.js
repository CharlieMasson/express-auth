require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const connexionRouter = require('./routes/connexion');
const session = require('express-session');

const app = express();

// session handler
app.use(session({
  resave: false, // pas d'enregistrement si aucune modif
  saveUninitialized: false, // session pas créé jusqua ce que une donnée sois créé
  secret: 'my very secret secret'
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/connexion', connexionRouter);

// catch 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // erreurs en dev
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // affichage page d'erreur
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
