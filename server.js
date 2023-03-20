const express = require('express');
const path = require('path');
const data = require('./data/nba-standings.json');

const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'static'));

liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.get('/data', (req, res) => {
  res.json(data);
});

app.use(connectLivereload());
app.use(express.static(path.join(__dirname, './static')));

app.get('/', (req, res) => {
  res.render('pages/index', { pageTitle: 'NBA Standings' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
