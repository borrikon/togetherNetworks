const { src, dest, series, watch } = require("gulp");
const LessAutoprefix = require("less-plugin-autoprefix");
const autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });
const less = require("gulp-less");
const path = require("path");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

function styles() {
  return src("./src/less/**/*.less")
    .pipe(concat("main.less"))
    .pipe(
      less({
        paths: [path.join("./src/less", "less", "includes")],
        plugins: [autoprefix],
      })
    )

    .pipe(dest("./src/css"));
}

function scripts() {
  return src("./src/js/**/*.js")
    .pipe(concat("index.js"))
    .pipe(dest("./src/js"));
}
function watchTask() {
  watch("./src/**/*.html", browsersyncReload);
  watch("./src/css/*.css", browsersyncReload);
  watch(["./src/less/**/*.less", "./src/js/**/*.js"], series(styles));
}
function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });
  cb();
}
function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}
exports.default = series(styles, scripts, browsersyncServe, watchTask);
