const express = require('express');
const path = require('path');

const west = require('./data/western-conference.json');
const east = require('./data/eastern-conference.json');

const app = express();
const port = 3000;

app.set('trust proxy', 1);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.get('/', (request, response) => {
  response.render('pages/index', { pageTitle: "NBA Standings", data: { west, east } });
});

app.get('/conference/west', (request, response) => {
  response.json(west);
});

app.get('/conference/east', (request, response) => {
  response.json(east);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
