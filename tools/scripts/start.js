const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const hot = require('webpack-hot-middleware');
const openBrowser = require('react-dev-utils/openBrowser');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');

const createDevConfig = require('../webpack.dev');
const config = require('../config');

(async () => {
  const devConfig = await createDevConfig();
  const compiler = webpack(devConfig);

  const host = config.devServerConfig.host();
  const port = await choosePort(host, config.devServerConfig.port());

  const devServer = new WebpackDevServer(compiler, {
    host,
    port,
    historyApiFallback: true,
    overlay: true,
    quiet: true,
    clientLogLevel: 'none',
    noInfo: true,
    contentBase: config.paths.src.templates,
    watchContentBase: true,
    hot: true,
    publicPath: config.paths.publicPath,
    after: (app) => {
      app.use(
        hot(compiler, {
          log: false,
        }),
      );
    },
  });

  devServer.listen(port, host, () => {
    console.log(
      `${chalk.greenBright('→ Server listening on')} ${chalk.blueBright(
        `http://${host}:${port}`,
      )}`,
    );

    openBrowser(`http://${host}:${port}`);
  });

  ['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, () => {
      devServer.close();
      process.exit();
    });
  });
})();
