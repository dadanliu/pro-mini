const TransformPages = require("uni-read-pages");
const { webpack } = new TransformPages();

module.exports = {
  configureWebpack: (config, isServer) => {
    let plugins = [
      new webpack.DefinePlugin({
        ROUTES: webpack.DefinePlugin.runtimeValue(() => {
          const tfPages = new TransformPages({
            includes: ["path", "name", "aliasPath"],
          });
          return JSON.stringify(tfPages.routes);
        }, true),
      }),
    ];

    const defaultConfig = {
      plugins,
    };

    console.log("isServer", isServer);
    // 只有在发布(isServer=true)的时候才进行此修改操作，否则在本地预览时出问题
    if (isServer) {
      const newConfig = {
        output: {
          filename: `pro-mini-demos/static/js/[name].[chunkhash].js`,
        },
      };
      // 修改客户端的 webpack 配置
      // 加入一个时间戳，让每次编译时，文件都不一样，也即每次发版本，都强行更新所有文件
      return Object.assign(defaultConfig, newConfig);
    } else {
      return defaultConfig;
    }
  },
};
