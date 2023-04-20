const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        // target:为客户端要发请求的后台服务器url
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: {'^/api':""}, 后端接口已经都带有/api
        ws: true,
        changeOrigin: true
      },
    }
  }
})
