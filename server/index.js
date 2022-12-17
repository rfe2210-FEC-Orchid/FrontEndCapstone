const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors')
const config = require('../config.js');

const PORT = config.PORT || 3001;

const app = express();

// middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());


// routes
app.all('/*', (req, res) => {
  return axios({
    method: req.method,
    url: config.API_URL + req.url,
    headers: {
      Authorization: config.API_TOKEN
    },
    data: req.body
  })
    .then((response) => {
      // console.log('response from API:', response);
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization");
      res.header("Access-Control-Allow-Credentials", "true");
      res.send(response.data);
      res.end();
    })
    .catch((err) => {
      console.log('API requesterror:', err);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));