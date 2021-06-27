require('newrelic');
const axios = require('axios');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

//send get request to title service - for sending req directly through proxy for testing
app.get('/title/:id', (req, res) => {
  axios.get(`http://localhost:3001/api/getTitle/${req.params.id}`)
  .then((title) => {
    // console.log('title', title);
    res.json(title.data);
  })
  .catch((err) => {
    res.send(err);
  })
});

app.listen(PORT, () => {
  console.log(`Proxy listening at port ${PORT}`);
});


//steps to take on deployed proxy - to be able to directly test service's api from proxy
//install axios on proxy server
//require it
//copy/paste above code for get req for /title/id