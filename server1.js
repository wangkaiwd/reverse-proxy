const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const app = express();
const PORT = 3000;
const PROXY_FLAG = '/api';
const TARGET = 'http://localhost:4000';

// proxy middleware options
const options = {
  target: TARGET,
  changeOrigin: true, // needed for virtual hosted sites
};
const setProxy = (proxyFlag, options) => {
  const exampleProxy = createProxyMiddleware(options);
  const index = app._router.stack.indexOf(exampleProxy);
  if (index !== -1) {
    app._router.stack.splice(index, 1);
  }
  app.use(proxyFlag, exampleProxy);
};
// create the proxy (without context)
// setProxy(PROXY_FLAG, options);
app.use('/test', async (req, res) => {
  const { target = TARGET, proxyFlag = PROXY_FLAG } = req.query;
  options.target = target;
  setProxy(proxyFlag, options);
  const reqUrl = `http://localhost:3000${proxyFlag}${req.path}`;
  const response = await axios(reqUrl).catch(err => {console.log('err', err);});
  const realIp = response.headers['x-real-ip'];
  res.json({
    proxyTarget: options.target,
    beforeProxy: reqUrl,
    afterProxy: realIp
  });
});
app.listen(PORT, () => {
  console.log(`Server is listen on ${PORT}`);
});
