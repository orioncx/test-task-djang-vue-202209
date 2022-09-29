const {defineConfig} = require('@vue/cli-service')
const webpack = require('webpack')
module.exports = defineConfig({
    transpileDependencies: [
        'vuetify'
    ],
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                ENV_SERVICE_URL: "'http://localhost:7000'", // use .env file variable here
            })
        ],
    }
})
