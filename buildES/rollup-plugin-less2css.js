export default function () {
  return {
    name: 'rollup-plugin-less2css',
    version: '1.0.0',
    transform: {
      async: true,
      // 如果此配置项为 true，则 rollup 中出现多个相同异步钩子时，这些异步钩子将按照书写的先后顺序依次执行
      sequential: true,
      // 钩子函数
      handler(code, id) {
        // id 表示即将进行编译的资源的绝对路径
        if (!/\.(vue|tsx?|jsx?)$/.test(id)) return
        if (!/\.less/.test(code)) return
        return code.replace(/\.less/g, '.css')
      }
    }
  }
}
