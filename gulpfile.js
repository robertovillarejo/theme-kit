var gulp = require("gulp"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  cleanCss = require("gulp-clean-css"),
  rename = require("gulp-rename"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer");
var browserSync = require("browser-sync").create();

gulp.task("build", () => {
  return gulp
    .src(["scss/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(
      postcss([
        autoprefixer({
          browsers: [
            "Chrome >= 35",
            "Firefox >= 38",
            "Edge >= 12",
            "Explorer >= 10",
            "iOS >= 8",
            "Safari >= 8",
            "Android 2.3",
            "Android >= 4",
            "Opera >= 12",
          ],
        }),
      ])
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("css/"))
    .pipe(cleanCss())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("css/"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("default", () => {
  browserSync.init(
    {
      server: {
        baseDir: process.cwd(),
      },
    },
    (err) => {
      console.error(err);
    }
  );
});

gulp.watch(["scss/*.scss"], gulp.series(["build"]));
