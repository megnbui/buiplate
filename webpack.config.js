const path = require( 'path' );
const merge = require('webpack-merge');
const config = require(`./webpack.config.${ process.env.NODE_ENV }.js`)

const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const sourcePath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

const ExtractCSS = new ExtractTextPlugin({
  filename: 'styles/[name].main.css'
})

const ExtractLess = new ExtractTextPlugin({
  filename: 'styles/[name].bundle.css',
  allChunks: true,
  ignoreOrder: true
})

module.exports = merge({
  /* Absolute path */
  context: sourcePath,

  /* Relative paths */
  entry: './client.js',

  output: {
    path: outputPath,
  },

  resolve: {
    /*
    * Absolute paths are not recursive
    * Relative paths are recursive
    */
    modules: [
      sourcePath,
      'node_modules',
    ],
  },

  module: {
    rules: [
      /* Enable ES Lint */
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },

      /* Enable babel compilation */
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },

      /* Base CSS styles and IE */
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: sourcePath,
        use: ExtractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },

      /* Enable CSS Modules and LESS */
      {
        test: /\.less$/,
        exclude: /node_modules/,
        include: sourcePath,
        use: ExtractLess.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'less-loader',
            options: {
              paths: [sourcePath], // resolve appVariables imports
              relativeUrls: false, // for use with url-loader
            }
          }
          ]
        })
      },
    ],
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
  ]
}, config);
