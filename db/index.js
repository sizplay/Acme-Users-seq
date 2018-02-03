const express = require('express');
//const router = require('Router');
const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false
});

const User = _conn.define('user', {
  id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  name: { type: Sequelize.STRING}
});

const sync = () => {
  return _conn.sync({ force: true });
};

const seed = () => {
  return Promise.all([
    User.create({ name: 'foo' }),
    User.create({ name: 'bar' }),
    User.create({ name: 'moe' })
  ]);
};

module.exports = {
  sync: sync,
  seed: seed,
  models: {
    User: User
  }
};

