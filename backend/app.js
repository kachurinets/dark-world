const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {id: 'fladjsflaj', title: 'First server-side posts', content: 'lfadjlfajlfdja'},
    {id: 'flafasdfaddjsflaj', title: 'Second server-side posts', content: 'lfadjlfajlfdja'}
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
