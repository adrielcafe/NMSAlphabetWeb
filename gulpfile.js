var gulp = require('gulp');
var express = require('express');

gulp.task('server', function() {
	var app = express();
	app.use(express.static(__dirname));
	app.listen(4000);
});

gulp.task('default', ['server']);