var gulp = require('gulp');
var express = require('express');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var scssFiles = './css/*.sass';
var jsFiles = ['./js/*.js', '!./js/*.min.js'];

gulp.task('server', function() {
	var app = express();
	app.use(express.static(__dirname));
	app.listen(4000);
});

gulp.task('compress', function () {
  return gulp.src(jsFiles)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./js'));
});

gulp.task('sass', function () {
  return gulp.src(scssFiles)
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
  gulp.watch(scssFiles, ['sass']);
  gulp.watch(jsFiles, ['compress']);
});

gulp.task('default', ['server', 'compress', 'sass', 'watch']);
