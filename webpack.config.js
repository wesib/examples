const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const distDir = `./dist`;

const webpackConfig = {
  entry: {
    'greet-text': './src/greet-text/index.ts',
  },
  devtool: 'inline-source-map',
  performance: {
    hints: false,
  },
  devServer: {
    contentBase: './dist',
    openPage: '/',
    watchContentBase: true,
    port: 3000,
  },
  module: {

    rules: [
      // Transpile TypeScript
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          }
        ],
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    mainFields: ['es2015', 'module', 'main']
  },
  output: {
    path: path.resolve(distDir),
    filename: '[name]/index.[chunkhash].js',
    libraryTarget: 'umd',
    library: 'webcbb.examples',
  },
  plugins: [
    new CleanWebpackPlugin([
      distDir,
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      chunks: [],
    }),
    new HtmlWebpackPlugin({
      filename: 'greet-text/index.html',
      template: 'src/greet-text/index.html',
      chunks: ['greet-text'],
    }),
  ],
};

module.exports = webpackConfig;
