const path = require('path');

const chunkNameJs = '[name].[hash:8].[id].js';

module.exports = {
  paths: {
    src: {
      base: path.resolve('src/'),
      js: path.resolve('src/'),
      css: path.resolve('src/css/'),
    },
    dist: {
      base: path.resolve('dist'),
      clean: [
        './img',
        './images',
        './css',
        './js'
      ]
    },
    appHtml: path.resolve('src/assets/template/index.html'),
  },
  entries: [
    path.resolve('src/index.js'),
  ],
  output: {
    filename: path.join('./js', '[name].[hash].js'),
    chunkFilename: chunkNameJs,
  },
  names: {
    chunkNameJs,
    chunkNameCss: '[name].[hash:8].[id].css',
    chunkNameAsset: '[name].[hash:8].[ext]',
    cssFilename: 'css/[name].[hash:8].css',
  },
  devServerConfig: {
    public: () => process.env.DEVSERVER_PUBLIC || 'http://localhost:3000',
    host: () => process.env.DEVSERVER_HOST || 'localhost',
    poll: () => process.env.DEVSERVER_POLL || false,
    port: () => process.env.DEVSERVER_PORT || 3000,
    https: () => process.env.DEVSERVER_HTTPS || false,
    autoOpenBrowser: true,
  },
};
