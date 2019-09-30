const express = require('express');

const app = express();

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
