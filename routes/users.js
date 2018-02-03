const app = require('express').Router();
const db = require('../db');
const { models } = db;
const { User } = models;

module.exports = app;

app.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.render('users', { title: 'Acme_User', users }))
    .catch(err => res.render('error', { err }));
});

app.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.send(user.id))
    .catch(err => res.render('error', { err }));
});

app.post('/', (req, res, next) => {
  User.create(req.body)
  .then(user => res.redirect('/users'))
    .catch(err => res.render('error', { err }));
});

app.delete('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(() => res.redirect('/users'))
    .catch(err => res.render('error', { err }));
});

