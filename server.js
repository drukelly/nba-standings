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

app.get('/data', (req, res) => {
  res.json(data);
});

app.use(connectLivereload());
app.use(express.static(path.join(__dirname, './static')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
