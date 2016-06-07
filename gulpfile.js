
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var slim = require("gulp-slim");
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

var slimIndexFile = './index.slim';
var slimFiles = ['./*.slim', './slim/*.slim'];
var sassFiles = './sass/*.sass';
var jsFiles = ['./js/*.js', '!./js/*.min.js'];

gulp.task('server', ['slim', 'sass-cleancss', 'eslint', 'uglify', 'watch'], function() {
    browserSync.init({
        server: "./dist"
    });
});

gulp.task('slim', function(){
  gulp.src(slimIndexFile)
    .pipe(slim({pretty: false}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass-cleancss', function () {
  return gulp.src(sassFiles)
		.pipe(sass().on('error', sass.logError))
    // .pipe(cleanCSS({keepSpecialComments: '0'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('eslint', function () {
  return gulp.src(jsFiles)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('uglify', ['eslint'], function () {
  return gulp.src(jsFiles)
    // .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch("./dist/*.html").on('change', browserSync.reload);
	gulp.watch(slimFiles, ['slim']);
  gulp.watch(sassFiles, ['sass-cleancss']);
	gulp.watch(jsFiles, ['eslint', 'uglify']);
});

gulp.task('default', ['server']);
