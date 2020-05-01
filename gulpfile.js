'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpConfig = require('./gulpconfig');
 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
    console.log('./assets/scss/**/*.scss')
  return gulp.src('./assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(gulpConfig.css));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
});