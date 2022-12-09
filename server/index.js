const express = require('express');
const axios = require('axios');
const path = require('path');

const PORT = process.env.PORT || 3001;

require('dotenv').config();

const app = express();

// middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// routes
app.all('/*', (req, res) => {
  console.log('request body:', req.body);
  // console.log('full url:', process.env.API_URL + req.url);

  return axios({
    method: req.method,
    url: process.env.API_URL + req.url,
    headers: {
      Authorization: process.env.API_TOKEN
    },
    data: req.body
  })
    .catch((err) => {
      console.log('API request error:', err);
      res.sendStatus(500);
    })
    .then((response) => {
      console.log('response from API:', response.data);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
      res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

      res.status(200).send(response.data);
    })
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
