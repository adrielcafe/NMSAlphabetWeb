
var browserSync = require('browser-sync').create();
var gulp = require('gulp');
var slim = require("gulp-slim");
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var slimIndexFile = './index.slim';
var slimFiles = ['./*.slim', './slim/*.slim'];
var sassFiles = './sass/*.sass';
var jsFiles = ['./js/*.js', '!./js/*.min.js'];

gulp.task('server', ['slim', 'sass', 'uglify', 'watch'], function() {
    browserSync.init({
        server: "./dist"
    });
});

gulp.task('slim', function(){
  gulp.src(slimIndexFile)
    .pipe(slim({pretty: false}))
    .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function () {
  return gulp.src(sassFiles)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('uglify', function () {
  return gulp.src(jsFiles)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function () {
	gulp.watch("./dist/*.html").on('change', browserSync.reload);
	gulp.watch(slimFiles, ['slim']);
  gulp.watch(sassFiles, ['sass']);
	gulp.watch(jsFiles, ['uglify']);
});

gulp.task('default', ['server']);
