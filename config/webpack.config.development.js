const webpackBase=require('./webpack.config.base')
const webpackMerge=require('webpack-merge')
const config =require('./config')




module.exports=webpackMerge(webpackBase,{
  mode:'development',
})