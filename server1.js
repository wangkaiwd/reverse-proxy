const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const app = express();
const PORT = 3000;
// proxy middleware options
const options = {
  target: 'http://www.example.org', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  // pathRewrite: {
  //   '^/api/old-path': '/api/new-path', // rewrite path
  // },
};

// create the proxy (without context)
const exampleProxy = createProxyMiddleware(options);
app.use('/api', exampleProxy);
app.use('/user/list', (req, res) => {
  res.json({
    data: [
      { name: '1', age: 11 },
      { name: '2', age: 12 },
      { name: '3', age: 13 },
    ]
  });
});
app.listen(PORT, () => {
  console.log(`Server is listen on ${PORT}`);
});
