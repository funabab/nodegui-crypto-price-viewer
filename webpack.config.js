const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')

module.exports = (_, argv) => {
  const mode = argv.mode || 'development'
  const isProd = mode === 'production'

  return {
    mode,
    target: 'node',
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: path.join(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.js$/i,
          include: path.join(__dirname, 'src'),
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: { node: 12 } }],
              '@babel/preset-react',
            ],
          },
        },
        {
          test: /\.node$/i,
          loader: 'native-addon-loader',
          options: {
            name: '[name]-[hash].[ext]',
          },
        },
        {
          test: /\.(ttf)$/i,
          loader: 'file-loader',
          options: {
            name: '[hash].[ext]',
            publicPath: 'dist',
          },
        },
      ],
    },
    devtool: isProd ? false : 'source-map',
    resolve: {
      extensions: ['.js'],
    },
    plugins: [new CleanWebpackPlugin()],
  }
}
