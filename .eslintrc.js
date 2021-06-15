module.exports = {
  "root": true,

  "env": {
    "node": true,
    "browser": true,
    "es6": true,
    "commonjs": true
  },

  "extends": [
    "plugin:vue/essential",
    "standard"
  ],
  globals: {
    AMap:true
  },
  "plugins": [
    "promise"
  ],

  "rules": {
    // 不允许使用debugger
    "no-debugger": "warn",
    "no-unused-vars": [
      2,
      {
      // 允许声明未使用变量
        "vars": "local",
        // 参数不检查
        "args": "none"
      }
    ],
    // 不允许多个空行
    "no-multiple-empty-lines": "warn",
    // 如果if语句里面有return,后面不能跟else语句
    "no-else-return": "error",
    // 块语句中的内容不能为空
    "no-empty": "error",
    // 禁止行内备注
    "no-inline-comments": "warn",
    // 禁用var，用let和const代替
    "no-var": "error",
    // 强制驼峰法命名
    "camelcase": "error",
    // 声明时必须赋初值
    "init-declarations": "error",
    // 不允许多个空格
    "no-multi-spaces": "warn",
    // 要判断一个变量是否是 NaN 的时候，一定要用 isNaN 方法
    "use-isnan": "error",
    // 行末逗号
    "comma-dangle": "warn",
    // 要求或不允许在文件末尾换行
    "eol-last": "off",
    // 语句结束强制分号
    "semi": [ "warn", "always" ],
    // 分号前后空格
    "semi-spacing": [ "warn", { "before": false, "after": false } ],
    // 不允许在行尾使用尾随空格
    "no-trailing-spaces": "warn",
    // 缩进风格
    "indent": [ "warn", 2 ],
    // 首选const
    "prefer-const": "error",
    // 引号类型 ``
    "quotes": [ "warn", "double" ],
    // 逗号前后的空格
    "comma-spacing": [ "warn", { "before": false, "after": true } ],
    // 强制关键字前后的间距一致
    "keyword-spacing": [ "warn", { "before": true, "after": true } ],
    // 在对象文字属性中强制键和值之间保持一致的间距
    "key-spacing": [ "warn", { "multiLine": { "beforeColon": false, "afterColon": true } } ],
    // 在数组括号内强制使用一致的间距
    "array-bracket-spacing": [ "warn", "always" ],
    // 强制将对象属性放置在单独的行上
    "object-property-newline": "warn",
    // 块语句内行首行尾是否要空行
    "padded-blocks": [ "warn", "never" ],
    // 操作符周围要不要有空格
    "space-infix-ops": [ "error", { "int32Hint": false } ],
    // 函数定义时括号前面要不要有空格
    "space-before-function-paren": [ "warn", { "anonymous": "never", "named": "never", "asyncArrow": "always" } ],
    // 不以新行开始的块{前面要不要有空格
    "space-before-blocks": [ "warn", "always" ],
    // 大括号内是否允许不必要的空格
    "object-curly-spacing": [ "warn", "always" ],
    // 对象字面量中的属性名是否强制双引号
    "quote-props": [ "warn", "always" ],
    // 注释风格要不要有空格什么的
    "spaced-comment": [ "warn", "always" ],
    // 禁止稀疏数组
    "no-sparse-arrays": "error",
    // 允许在赋值或比较之外使用“new”运算符
    "no-new": "off",
    // 对Vue组件中的道具名称强制使用特定的大小写
    "vue/prop-name-casing": [ "error", "camelCase" ],
    // 强制组件中属性的顺序
    "vue/order-in-components": [ "error", "LIFECYCLE_HOOKS" ],
    // 强制组件名称驼峰命名
    "vue/name-property-casing": [ "error", "PascalCase" ],
    // 不允许多个空格
    "vue/no-multi-spaces": "warn",
    // 不允许注册模板中未使用的组件
    "vue/no-unused-components": [ "error", { "ignoreWhenBindingPresent": false } ],
    // 强制道具默认值有效
    "vue/require-valid-default-prop": "error",
    // 必须使用catch来处理异步失败方法
    "promise/catch-or-return": 0
  },

  "parserOptions": {
    "parser": "babel-eslint"
  }
};
