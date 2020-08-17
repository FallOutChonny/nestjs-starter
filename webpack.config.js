const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const { pathOr, compose, head, path: Rpath } = require('ramda')

const resolveApp = (relativePath) => path.resolve(__dirname, relativePath)

const isDev = process.env.NODE_ENV === 'development'

module.exports = function (options) {
  return {
    ...options,
    bail: true,
    entry: isDev ? ['webpack/hot/poll?100', options.entry] : options.entry,
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: [
            'cache-loader',
            // get properties of module.rules[0].use 
            ...compose(Rpath(['use']), head, pathOr([], ['module', 'rules']))(options),
          ],
          exclude: /node_modules/,
        },
      ],
    },
    watch: isDev,
    devtool: isDev ? false : 'source-map',
    mode: isDev ? 'none' : 'production',
    externals: [
      nodeExternals({
        allowlist: isDev ? ['webpack/hot/poll?100'] : [],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      ...(isDev
        ? [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new StartServerPlugin({ name: options.output.filename }),
          ]
        : []),
    ],
    resolve: {
      ...options.resolve,
      alias: {
        '@': resolveApp('src/shared'),
        '@auth': resolveApp('src/auth'),
        '@user': resolveApp('src/user'),
        '@role': resolveApp('src/role'),
      },
    },
  }
}
