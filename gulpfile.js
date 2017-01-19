'use strict';
const gulp = require('gulp');
const csslint = require('gulp-csslint');
const htmlhint = require("gulp-htmlhint");
const jscs = require('gulp-jscs');
const jshint = require('gulp-jshint');
const connect = require('gulp-connect');

const paths = {
  src: 'src', dst: './dist',
  css:   ['test/*.css', 'test/**/*.css',
          'src/*.css',   'src/**/*.css'],
  html:  ['src/*.html', 'src/**/*.html',
          'test/*.html', 'test/**/*.html'],
  js:    ['test/*.js',   'test/**/*.js',
          'src/*.js',    'src/**/*.js'],
  csssrc:['src/*.css',   'src/**/*.css'],
  htmlsrc:  ['src/*.html', 'src/**/*.html'],
  jssrc: ['src/*.js',    'src/**/*.js']
};

gulp.task('reload', function () {
  return gulp.src(paths.js, { read: false })
    .pipe(connect.reload());
});

gulp.task('css-lint', function() {
  return gulp.src(paths.css)
    .pipe(csslint())
    .pipe(csslint.formatter());
});

gulp.task('html-hint', _ => {
  return gulp.src(paths.html)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('js-lint', _ => {
  return gulp.src(paths.jssrc)
    .pipe(jshint())
    .pipe(jscs())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs.reporter());
});

gulp.task('html-copy', _ => {
  return gulp.src(paths.htmlsrc)
    .pipe(gulp.dest(paths.dst));
});

gulp.task('js-copy', _ => {
  return gulp.src(paths.jssrc)
    .pipe(gulp.dest(paths.dst));
});

gulp.task('css-copy', _ => {
  return gulp.src(paths.csssrc)
    .pipe(gulp.dest(paths.dst));
});


gulp.task('watch', _ => {
  gulp.watch(paths.js, ['reload']);
  gulp.watch(paths.html, ['html-hint', 'html-copy', 'reload']);
  gulp.watch(paths.jssrc, ['js-lint', 'js-copy', 'reload']);
  gulp.watch(paths.csssrc, ['css-lint', 'css-copy', 'reload']);
});

gulp.task('connect', function() {
  connect.server({
    root: paths.dst,
    livereload: true,
    port: 7002
  });
});

gulp.task('default', [
  'js-lint', 'css-lint', 'html-hint',
  'html-copy', 'js-copy', 'css-copy',
  'watch',
  'connect'
]);

