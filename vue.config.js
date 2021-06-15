const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}
module.exports = {
  "publicPath": "/admin/",
  "outputDir": "dist",
  "assetsDir": "assets",
  "indexPath": "index.html",
  "filenameHashing": true,
  "runtimeCompiler": true,
  "productionSourceMap": true,

  "css": {
    "modules": false,
    "extract": false,
    "loaderOptions": {
      "scss": {
        "data": "@import \"@/assets/css/variables.scss\";"
      }
    }
  },

  "devServer": {
    "port": 3000,
    "open": true,
    "proxy": {
      "/api": {
        "target": "https://test.mall.maxxis.com.cn/api",
        "ws": true,
        "changeOrigin": true,
        "pathRewrite": {
          "^/api": ""
        }
      }
    }
  },
  "configureWebpack": {
    "resolve": {
      "alias": {
        "@": resolve("src")
      }
    }
  }
};
