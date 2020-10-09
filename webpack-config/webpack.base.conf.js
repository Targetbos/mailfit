const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  VueLoaderPlugin
} = require('vue-loader')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../build'),
  assets: 'assets/'
}
const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    index: ['babel-polyfill', `${PATHS.src}/`, `${PATHS.src}/assets/scss/main.scss`]
  },
  resolve: {
    alias: {}
  },
  module: {
    rules: [{
      test: /\.pug$/,
      oneOf: [
        // this applies to <template lang="pug"> in Vue components
        {
          resourceQuery: /^\?vue/,
          use: ['pug-plain-loader']
        },
        // this applies to pug imports inside JavaScript
        {
          use: ['pug-loader']
        }
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loader: {
          scss: [
            "vue-style-loader",
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                config: {
                  path: 'postcss.config.js'
                }
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        }
      }
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(images|img|image)/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/fonts/',
        publicPath: '../fonts/'
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      exclude: /(fonts|font)/,
      options: {
        name: '[name].[ext]',
        outputPath: 'assets/images/',
        publicPath: '../images/'

      }
    }, {
      test: /\.scss$/,
      use: [
        "style-loader",
        {
          loader: MiniCssExtractPlugin.loader,
          options: {}
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: "postcss-loader",
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js'
            }
          }
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-resources-loader',
          options: {
            resources: `${PATHS.src}/assets/scss/utils/vars.scss`
          },
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: `./postcss.config.js`
            }
          }
        }
      ]
    }]
  }
]
},

plugins: [
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: 'assets/css/[name].css',
    chunkFilename: '[id].css',

  }),

  new CopyWebpackPlugin({
    patterns: [{
        from: `${PATHS.src}/assets/images`,
        to: `${PATHS.assets}images`
      },
      {
        from: `${PATHS.src}/assets/fonts`,
        to: `${PATHS.assets}fonts`
      },
      {
        from: `${PATHS.src}/static`,
        to: ``
      }
    ]
  }),
  ...PAGES.map(page => new HtmlWebpackPlugin({
    template: `${PAGES_DIR}/${page}`,
    filename: `./${page.replace(/\.pug/,'.html')}`
  }))
]
}