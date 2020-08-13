const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const { pathOr, compose, head } = require('ramda')

const resolveApp = (relativePath) => path.resolve(__dirname, relativePath)

module.exports = function (options) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    module: {
      ...options.module,
      rules: [
        {
          ...compose(head, pathOr([], ['module', 'rules']))(options),
          use: [
            'cache-loader',
            'thread-loader',
            ...compose(path(['use']), head, pathOr([], ['module', 'rules']))(options),
          ],
        },
      ],
    },
    watch: true,
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
      new StartServerPlugin({ name: options.output.filename }),
    ],
    resolve: {
      ...options.resolve,
      alias: {
        ...options.resolve.alias,
        '@': resolveApp('src/shared'),
        '@user': resolveApp('src/user'),
      },
    },
  }
}
