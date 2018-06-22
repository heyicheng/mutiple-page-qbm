const HTMlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin=require('extract-text-webpack-plugin')
const path = require('path')
const config = require('./config')
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {}
config.HTMLDirs.forEach(page => {
  const htmlPlugin = new HTMlWebpackPlugin({
    filename: `../html/${page}/${page}.html`,
    template: path.resolve(__dirname, `../app/page/${page}/${page}.html`),
    inject: true, //是否把js文件放入到html的底部
    chunks: [page, 'common']
  })
  HTMLPlugins.push(htmlPlugin)
  //对应的每个项目的多入口文件
  Entries[page] = path.resolve(__dirname, `../app/js/${page}/${page}.js`)
})
module.exports = {
  entry: Entries,
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(__dirname, '../dist/js'),
    filename: '[name]/[name].build.[hash].js',
    // publicPath:'./dist/[name]/',//打包后生成的目录
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      //此时并没有把css抽离出来 
      {test:/\.css$/,use:['style-loader','css-loader','postcss-loader'],exclude:/node_modules/},
      {test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,use:'url-loader'},
    ]
  },
  plugins: [
    new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
      root: path.resolve(__dirname, '../')
    }),
    ...HTMLPlugins
  ]
}