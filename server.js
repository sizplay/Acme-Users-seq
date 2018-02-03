const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const path = require('path');
const db = require('./db');
const routes = require('./routes/users');
const User = db.models.User;
app.use(require('method-override')('_method'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());

nunjucks.configure( {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);


app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/users', routes);

app.use((req, res, next) => {
  res.locals.path = req.url;
  next();
});

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Acme-Home' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('listening on port ' + port);
});

db.sync()
  .then(() => {
    db.seed();
  });
