const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  },
});

module.exports = defineConfig({
  publicPath: '/', // app이 배포될 root url
  //FIXME: -> 환경변수로 추출하는편이 좋아보임
  outputDir: '../DB_Project/dist', // app이 배포될 경로
  assetsDir: 'emr/static', // static 폴더를 정의하는 경로

  chainWebpack: (config) => {
    config.optimization.splitChunks(false);

    config.devServer
      .host('0.0.0.0')
      .port(8080)
      .https(false)
      .headers({ 'Access-Control-Allow-Origin': ['*'] });
  },

  pages: {
    index: 'src/main.js',
  },
});
