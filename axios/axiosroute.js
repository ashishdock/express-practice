const express = require('express');
const axiosroute = express();
const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/posts';

axiosroute.get('/', async (req, res) => {
  try {
    console.log('Making Axios call');
    const response = await axios.get(url);
    res.status(200).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'something bad has occured' });
  }
});

axiosroute.get('/:id', async (req, res) => {
  try {
    let postId = req.params.id;
    console.log('Making Axios call witd ID: ', postId);
    const response = await axios.get(url + '/' + postId);
    res.status(200).json({ data: response.data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'something bad has occured' });
  }
});

module.exports = axiosroute;
