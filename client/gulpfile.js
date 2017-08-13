'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

gulp.task('sass', function () {
  return gulp.src('./sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename("App.min.css"))
    .pipe(gulp.dest('./src'));
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass'])
});

gulp.task('default', ['sass','watch']);
