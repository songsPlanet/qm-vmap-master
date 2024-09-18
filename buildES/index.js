import path from 'path';
import chalk from 'chalk';
import process from 'process';
import { rollup } from 'rollup';
import { fileURLToPath } from 'url';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import vuePlugin from 'rollup-plugin-vue';
import commonjs from '@rollup/plugin-commonjs';
import less2css from './rollup-plugin-less2css.js';
import imageToBase64 from '@rollup/plugin-image';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import importAntDesignIconsVue from './rollup-plugin-import-ant-design-icons-vue.js';

const __dirname = fileURLToPath(new URL('./', import.meta.url));
const extensions = ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs'];

const inputOptions = {
  input: path.resolve(__dirname, '../src/gis/index.ts'),
  external: [/[\\/]node_modules[\\/]/, /\.less/, /\.css/, /\.scss/],
  makeAbsoluteExternalsRelative: false,
  plugins: [
    // rollup 无法直接对 node_modules 中的第三方库进行加载，必须依赖 @rollup/plugin-node-resolve 插件
    nodeResolve(),
    // 如果依赖项是 commonjs 模块，必须要依赖 @rollup/plugin-commonjs 插件才能完成加载
    commonjs(),
    // 指定路径别名，与 webpack 或者 vite 中一样即可
    alias({ entries: { '@': path.resolve('src') } }),
    // 对 Vue 文件进行解析和转换，从而得到你想要的 JS 文件
    vuePlugin(),
    // 处理 ts
    typescript({ check: false }),
    // 对于转换后的 JS 文件，再使用 babel 进行转换，babel 的配置文件建议使用 babel.config.js
    babel({
      extensions,
      babelHelpers: 'runtime',
      exclude: /[\\/]node_modules[\\/]/,
    }),
    // 将所有的被 js 引入的图片资源全部打包成 base64
    imageToBase64(),
    // 将文件中的所有引入 '.less' 全部转换成 '.css'
    // less2css(),
    // 将文件中引入的 @ant-design/icons-vue 进行拆分
    // importAntDesignIconsVue(),
  ],
};

const outputOptions = {
  format: 'es',
  // 保持原有的目录结构
  preserveModules: true,
  // 库的代码是存在 src/library 目录下的。
  // 如果要保持原有的目录结构输出到 es 目录下，就需要将 src/gis 这个路径去掉。
  // 否则打包生成的文件路径就包含 /gis，例如 src/gis/a.tsx => es/gis/a.js
  // 这与我们的预期不一致，我们希望的结果应该是 es/a.js。
  preserveModulesRoot: 'src/gis',
  dir: path.resolve(__dirname, '../es'),
};

async function buildES() {
  let bundle = null;
  try {
    bundle = await rollup(inputOptions);
    await bundle.write(outputOptions);
  } catch (error) {
    const msg = error.stack.replace(/^\b/gm, '   ');
    process.stdout.write(chalk.hex('#ff0000')(msg));
    // 关闭进程
    process.exit(1);
  }

  if (bundle) bundle.close();
}
buildES();

export default buildES;
