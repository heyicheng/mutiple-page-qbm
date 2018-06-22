const fs=require('fs')
const path=require('path')
let HTMLDirs=fs.readdirSync(path.resolve(__dirname,'../app/page'))
module.exports={
  HTMLDirs,
} 