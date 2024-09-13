import path from 'path'
import gulp from 'gulp'
import less from 'gulp-less'
import babel from 'gulp-babel'
import clean from 'gulp-clean'
import through2 from 'through2'
import base64 from 'gulp-base64'
import postcss from 'gulp-postcss'
import child_process from 'child_process'
import buildES from './config/rollup.config.lib.js'
import fs from 'fs'
import { fileURLToPath } from 'url';



const context = fileURLToPath(new URL('./', import.meta.url))

function cleanDir() {
  return gulp.src(['es', 'lib'], { read: false, allowEmpty: true }).pipe(clean({ force: true }))
}

function rewriteBuildES() {
  return gulp
    .src('src/gis/index.ts')
    .pipe(babel({ configFile: './babel.config.cjs' }))
    .pipe(gulp.dest('./es'))
}

function buildCJS() {
  return gulp
    .src('es/**/*.js')
    .pipe(babel({ configFile: './babel.config.lib.cjs' }))
    .pipe(gulp.dest('./lib'))
}

function buildStyle() {
  return gulp
    .src('src/gis/**/*.less')
    .pipe(less())
    .pipe(postcss())
    .pipe(base64())
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'))
}

// const buildDTS = gulp.series(
//   function () {
//     // vue 项目中必须使用 vue-tsc 才能执行 tsc，否则无法对 vue 文件进行编译
//     return child_process.exec('npx vue-tsc -p tsconfig.lib.json')
//   },
//   function () {
//     return gulp
//       .src('dist/**/*.d.ts')
//       .pipe(
//         through2({ objectMode: true }, function (chunk, _, callback) {
//           const newBase = path.join(chunk.base, 'dist')
//           if (chunk.path.startsWith(newBase)) chunk.base = newBase

//           return callback(null, chunk)
//         })
//       )
//       .pipe(gulp.dest('es'))
//       .pipe(gulp.dest('lib'))
//   },
//   function () {
//     return gulp.src(['dist'], { read: false, allowEmpty: true }).pipe(clean())
//   }
// )

const buildDTS = gulp.series(
  function compileTs() {
    return new Promise((resolve, reject) => {
      child_process.exec('npx vue-tsc-p tsconfig.lib.json', (error, stdout, stderr) => {
        if (error) reject(new Error(`Exec error: ${error}`))
        if (stderr) console.error(`stderr: ${stderr}`)
        resolve()
      })
    })
  },
  function moveDts() {
    return gulp.src(['dts/**/*.d.ts']).pipe(gulp.dest('lib')).pipe(gulp.dest('es'))
  },
  function cleanupDtsDir(cb) {
    const dtsDir = path.resolve(context, 'dts')
    if (fs.existsSync(dtsDir)) {
      fs.rmSync(dtsDir, { force: true, recursive: true })
    }
    cb()
  }
)

export default gulp.series(cleanDir, buildES, rewriteBuildES, buildCJS, buildStyle, buildDTS)
