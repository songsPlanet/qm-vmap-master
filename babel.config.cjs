module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // false 表示使用 ES Module 进行构建，默认为 true，表示使用 commonjs
        modules: false,
        debug: false,
        // "usage" 表示将根据您的上下文来引入需要的 polyfill。
        // 如果你使用 "entry"，则将从入口文件处引入所有的 polyfill。
        useBuiltIns: 'usage',
        // 这里的 version 请保持与您安装的 core-js 的版本一致
        corejs: { version: '3.38', proposals: true }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    // 如果你使用了 jsx 语法，请配置该插件
    '@vue/babel-plugin-jsx',
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    // @babel/preset-env 只对新的语法进行转换，对于新的API（内置类的静态方法，全局方法以及实例方法）不进行转换
    // 所以这里引入 transform-runtime 插件，将所有新语法经过 preset-env 转换后的辅助函数全部使用 runtime-corejs/helpers 替换；
    // 同时对于 preset-env 转换后产生的全局引入，替换成模块引入的方法，避免了全局污染；
    // 最后一点就是通过模块引入的方式按需引入 polyfill 来支持 ES6+ 新增的内置类的静态方法，全局方法以及实例方法
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-class-properties', { loose: false }]
  ]
}
