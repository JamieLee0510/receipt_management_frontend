module.exports = {
  publicPath: "./",
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          //   "primary-color": "#1DA57A",
          //   "link-color": "#1DA57A",
          //   "border-radius-base": "2px",
          "layout-sider-background-light": "#FFCC22",
          "menu-dark-color": "#FFCC22",
          // "menu-dark-submenu-bg": "#FFCC22",
        },
        javascriptEnabled: true,
      },
    },
  },
};
