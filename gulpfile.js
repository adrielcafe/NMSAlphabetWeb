
var browserSync = require('browser-sync').create(),
    gulp = require('gulp'),
    slim = require("gulp-slim"),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename');

var slimIndexFile = './index.slim',
    slimFiles = ['./*.slim', './slim/*.slim'],
    sassFiles = './sass/*.sass',
    jsFiles = './js/*.js';

gulp.task('server', ['build:html', 'build:css', 'build:js', 'watch'], function() {
  browserSync.init({
    server: "./dist"
  });
});

gulp.task('build:html', function(){
  gulp.src(slimIndexFile)
    .pipe(slim({pretty: false}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build:css', function () {
  return gulp.src(sassFiles)
		.pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    // .pipe(cleanCSS({keepSpecialComments: '0'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('build:js', function () {
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
      // .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch("./dist/*.html").on('change', browserSync.reload);
	gulp.watch(slimFiles, ['build:html']);
  gulp.watch(sassFiles, ['build:css']);
	gulp.watch(jsFiles, ['build:js']);
});

gulp.task('default', ['server']);
