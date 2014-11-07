var autoprefixer = require('gulp-autoprefixer');
var bower = require('gulp-bower');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var spawn = require('child_process').spawn;
var typescript = require('gulp-tsc');

var paths = {
  css: 'css/*.css',
  ts: 'ts/*.ts'
}

gulp.task('default', ['compile']);

gulp.task('compile', ['bower', 'css', 'typescript']);
gulp.task('test', ['compile']);
gulp.task('watch', function() {
  gulp.watch(paths.ts, ['typescript']);
  gulp.watch(paths.css, ['css']);
  livereload.listen();
  gulp.watch('public/*').on('change', livereload.changed);
  spawn('npm', ['start']);
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(autoprefixer())
    .pipe(gulp.dest('public/'));
});

gulp.task('typescript', function() {
  return gulp.src(paths.ts)
    .pipe(typescript({safe: true}))
      .on('error', function() {})
    .pipe(gulp.dest('public/'));
});
