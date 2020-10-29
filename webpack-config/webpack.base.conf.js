const path = require('path')
const fs = require('fs')
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  build: path.join(__dirname, '../build'),
  assets: 'assets/'
}

const PAGES_DIR = `${PATHS.src}/pug/pages/`
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    index: [`${PATHS.src}/index.js`, `${PATHS.src}/assets/scss/main.scss`]
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.build,
  },

  module: {
    rules: [{
        test: /\.pug$/,
        use: ['pug-loader']
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }, {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        exclude: /\\(img|images|icon|icons)\\/i,
        options: {
          name: '[name].[ext]',
          outputPath: `${PATHS.assets}fonts/`,
          publicPath: `../fonts/`
        }
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        exclude: /\\(fonts)\\/i,
        options: {
          name: `[name].[ext]`,
          outputPath: `${PATHS.assets}images/`,
          publicPath: (name, pathFile) => {
            let regExpFonts = /\\(img)\\/i;
            if (regExpFonts.test(pathFile) == true) {
              return `assets/images/${name}`;
            } else {
              return `../images/${name}`;
            }
          }
        },
      }, {
        test: /\.scss$/,
        use: [
          "style-loader",
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
            loader: 'resolve-url-loader',
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-resources-loader',
            options: {
              resources: `${PATHS.src}/assets/scss/utils/vars.scss`
            },
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
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
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      "$": "jquery",
      "window.$": "jquery",
      "jQuery": "jquery",
      "window.jQuery": "jquery",
      "jquery": "jquery",
      "window.jquery": "jquery"
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
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
      filename: `./${page.replace(/\.pug/,'.html')}`,
      chunks: [`${page.replace(/\.pug/,'')}`]
    }))
  ]
}