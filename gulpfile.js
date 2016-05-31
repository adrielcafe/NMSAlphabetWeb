var gulp = require('gulp');
var express = require('express');
var slim = require("gulp-slim");
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var slimIndexFile = './index.slim';
var slimFiles = ['./*.slim', './html/*.slim'];
var scssFiles = './css/*.sass';
var jsFiles = ['./js/*.js', '!./js/*.min.js'];

gulp.task('server', function() {
	var app = express();
	app.use(express.static(__dirname));
	app.listen(4000);
});

gulp.task('slim', function(){
  gulp.src(slimIndexFile)
    .pipe(slim({pretty: true}))
    .pipe(gulp.dest('./'));
});

gulp.task('minify', function () {
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
	gulp.watch(slimFiles, ['slim']);
	gulp.watch(jsFiles, ['minify']);
  gulp.watch(scssFiles, ['sass']);
});

gulp.task('default', ['server', 'slim', 'minify', 'sass', 'watch']);
