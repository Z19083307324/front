const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/front/'  // 你的 GitHub 仓库名称
  : '/',

  configureWebpack: {
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, 'src/assets/images')
      }
    }
  }
})
