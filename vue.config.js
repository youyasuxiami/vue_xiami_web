const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const hostName = process.env.VUE_APP_HOST_NAME

module.exports = {
    publicPath: "./",
    lintOnSave: false, //关闭eslint
    // outputDir: process.env.outputDir,npm
    assetsDir: "static",
    devServer: {
        proxy: {
            //     '/':{
            //         ws:false,
            //         target:'http://localhost:8086',
            //         changeOrigin:true,
            //         // pathRewrite:{
            //         //     '/':''
            //         // }
            //     },
            [process.env.VUE_APP_BASE_URL]: {
                ws: false,
                target: hostName,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_URL]: ''
                }
            }
        },
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",

                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
};

