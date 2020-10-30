const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require('copy-webpack-plugin');

const {ENV} = process.env

const servicePath = path.resolve(__dirname, '../server/static');

function productionBuildOutput() {

  if(ENV === 'production') {
    return {
      entry: {
        index: './src/index.js',
      },
      output: {
        filename: 'bundle.[name].js',
        path: servicePath,
      }
    }
  } else {
    return {
      entry: {
        index: './src/index.js',
        // redux_store: './src/reducers/index.js',
        // components: './src/components/index.js'
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
      devtool: 'source-map',
    }
  }
}

module.exports = {

  ...productionBuildOutput(),

  devServer: {
    port: 8080,
    inline: true,
    liveReload: false,
    historyApiFallback: true,
    contentBase: [
      path.join(__dirname, 'public')
    ],
    proxy: {
      '/': 'http://127.0.0.1:3000'
    }
  },

  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$|.scss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new CopyPlugin({
      patterns: [
        {from: 'public', to: servicePath},
      ],
    }),
  ]
}