const path = require('path')
const webpack = require('webpack')

const defaultSettings = require('./src/settings.js')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title // page title


module.exports = {
    publicPath: "./",
    lintOnSave: false, //关闭eslint
    outputDir: 'dist',
    assetsDir: "assets",
    configureWebpack: {
        name: name,
        resolve: {
            alias: { //绝对路径
                '@': resolve('src')
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",

                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    // chainWebpack: config => {
    //     config
    //         .plugin('html')
    //         .tap(args => {
    //             args[0].title= '你想设置的title名字'
    //             return args
    //         })
    // }
};

