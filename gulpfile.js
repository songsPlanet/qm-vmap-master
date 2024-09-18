import path from 'path';
import gulp from 'gulp';
import less from 'gulp-less';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import through2 from 'through2';
import base64 from 'gulp-base64';
import postcss from 'gulp-postcss';
import buildES from './buildES/index.js';
import child_process from 'child_process';

function cleanDir() {
  // 读取根目录下的 es、lib 目录，
  // read: false 表示不读取文件内容，这样设置可以使程序执行更快
  // allowEmpty: true 表示如果文件目录不存在时，gulp 不会抛出异常。
  return gulp.src(['./es', './lib'], { read: false, allowEmpty: true }).pipe(clean({ force: true }));
}

function rewriteBuildES() {
  return gulp
    .src('./src/gis/index.ts')
    .pipe(babel({ configFile: './babel.config.cjs' }))
    .pipe(gulp.dest('./es'));
}

function buildCJS() {
  return gulp
    .src('./es/**/*.js')
    .pipe(babel({ configFile: './babel.config.lib.cjs' }))
    .pipe(gulp.dest('./lib'));
}

function buildStyle() {
  // 先读取 src/library 目录下的所有 less 文件，然后对 less 文件进行编译，编译后会转成 css 文件保存在内存中。
  return (
    gulp
      .src('./src/gis/**/*.less')
      .pipe(less())
      // 紧接着继续读取 src/gis 目录下的所有 css 文件
      // .pipe(gulp.src('./src/gis/**/*.css'))
      // 然后将以上步骤中所有的 css 文件都交由 postcss 进行处理
      // 如果项目根目录下已经存在 postcss.config.cjs 文件，这里可以不用配置 options
      .pipe(postcss())
      // 最后是将 css 文件中所有依赖的静态资源全部打包成 base64 内嵌在 css 文件中
      .pipe(base64())
      // 写入到 es 目录下
      .pipe(gulp.dest('./es'))
      // 写入到 lib 目录下
      .pipe(gulp.dest('./lib'))
  );
}
const buildDTS = gulp.series(
  // eslint-disable-next-line prefer-arrow-callback
  function () {
    // vue 项目中必须使用 vue-tsc 才能执行 tsc，否则无法对 vue 文件进行编译
    // 注意，这里我们指定了 vue-tsc 的配置文件为 ./tsconfig.lib.json
    // 建议在你的控制台中单独执行 `npx vue-tsc -p tsconfig.lib.json` 命令，并查看生成的内容。便于下文的展开
    return child_process.exec('npx vue-tsc -p tsconfig.lib.json');
  },
  () => {
    return (
      gulp
        .src('./dist/**/*.d.ts')
        .pipe(
          through2({ objectMode: true }, (chunk, _, callback) => {
            const newBase = path.join(chunk.base, './gis');
            if (chunk.path.startsWith(newBase)) chunk.base = newBase;

            return callback(null, chunk);
          }),
        )
        // 最终，文件将输出到 es，lib 目录中，
        .pipe(gulp.dest('es'))
        .pipe(gulp.dest('lib'))
    );
  },
  () => {
    return gulp.src(['./dist'], { read: false, allowEmpty: true }).pipe(clean());
  },
);

export default gulp.series(cleanDir, buildES, rewriteBuildES, buildCJS, buildStyle, buildDTS);
