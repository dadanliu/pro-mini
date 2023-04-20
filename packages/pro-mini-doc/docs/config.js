module.exports = {
  title: "pro-mini-components",
  description: "Just playing around",
  base: "/pro-mini/",
  dest: "dist",
  configureWebpack: (config, isServer) => {
    const defaultConfig = {
      node: {
        global: true,
      },
    };

    console.log("isServer", isServer);
    // 只有在发布(isServer=true)的时候才进行此修改操作，否则在本地预览时出问题
    if (isServer) {
      const newConfig = {
        output: {
          filename: `pro-mini/assets/js/[name].${+new Date()}.[chunkhash].js`,
        },
      };
      // 修改客户端的 webpack 配置
      // 加入一个时间戳，让每次编译时，文件都不一样，也即每次发版本，都强行更新所有文件
      return Object.assign(defaultConfig, newConfig);
    } else {
      return defaultConfig;
    }
  },
  head: [
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0",
      },
    ],
    [
      "meta",
      {
        name: "keywords",
        content: "pro-mini-components",
      },
    ],
  ],
  themeConfig: {
    logo: "https://t.focus-res.cn/front-end/image/focus-logo-v2/logo_120_120.png",
    search: true, // 是否显示顶部搜索框
    searchPlaceholder: "搜索文档关键字",
    sidebarDepth: 0,
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" },
      {
        text: "组件",
        link: "/components/intro",
      },
      {
        text: "GitLab",
        link: "https://github.com/YanxinNet/uView",
      },
    ],
    sidebar: [
      {
        title: "介绍",
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 0,
        children: [
          ["/intro/background", "项目介绍"],
          ["/intro/quickStart", "快速上手"],
          ["/intro/contribution", "参与贡献"],
        ],
      },
      {
        title: "通用", // 必要的
        collapsable: false, // 可选的, 默认值是 true,
        children: [
          // ["/components/py-selector", "py-selector 选择器"],
          ["/components/image-preview", "image-preview 图片预览"],
          ["/components/picker", "picker"],
          ["/components/finish-mobile", "finish-mobile"],
          // ['/components/moda',l 'modal'],
        ],
      },
    ],
  },
  markdown: {
    // markdown-it-anchor 的选项
    anchor: { permalink: false },
    // markdown-it-toc 的选项
    toc: { includeLevel: [1, 2] },
  },
};
