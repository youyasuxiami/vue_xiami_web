const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: "./",
    lintOnSave: false, //关闭eslint
    outputDir: process.env.outputDir,
    devServer: {
        proxy: {
            '/':{
                ws:false,
                target:'http://localhost:8085',
                changeOrigin:true,
                // pathRewrite:{
                //     '/':''
                // }
            },
        },
    }
};

