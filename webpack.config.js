const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractLess = new ExtractTextPlugin({
  filename: '../style/[name].css',
  disable: process.env.NODE_ENV === 'development'
})
const webpack = require('webpack')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    index: './src/script/index.js',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'build/script'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/script')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        use: extractLess.extract({
          use: [{
              loader: "css-loader"
          }, {
              loader: "less-loader"
          }],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    extractLess,
    new webpack.optimize.CommonsChunkPlugin({  //有这个就会把指定的抽到vendor里，就不用externals了
      names: ['vendor']
    }),
    new UglifyJSPlugin()
  ],
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM'
  // }
}