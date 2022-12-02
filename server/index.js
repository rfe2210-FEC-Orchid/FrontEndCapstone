const express = require('express');
const axios = require('axios');
const path = require('path');

const PORT = process.env.PORT || 3000;
require('dotenv').config();

const app = express();

// middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// routes
app.all('/*', (req, res) => {
  // console.log('request method:', req.method);
  // console.log('request url:', req.url);
  // console.log('request params:', req.params);
  // console.log('request body:', req.body);
  // console.log('full url:', process.env.API_URL + req.url);

  return axios({
    method: req.method,
    url: process.env.API_URL + req.url,
    headers: {
      Authorization: process.env.API_TOKEN
    }
  })
    .catch((err) => {
      console.log('API requesterror:', err);
      res.sendStatus(500);
    })
    .then((response) => {
      console.log('response from API:', response);
      res.sendStatus(200);
    });

  // next();
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
