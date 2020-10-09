const {merge} = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../build'),
  assets: 'assets/'
}
const buildWebpackConfig = merge(baseWebpackConfig,{
  mode: 'production',
  output:{
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: ''
  }
})

module.exports = new Promise((resolve, reject) =>{
  resolve(buildWebpackConfig)
})