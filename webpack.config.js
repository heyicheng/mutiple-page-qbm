const env=process.env.MOOD_ENV.replace(/(^\s*)|(\s*$)/g,'')
console.log(`./config/webpack.congif.${env}.js`)
module.exports=require(`./config/webpack.config.${env}.js`) 