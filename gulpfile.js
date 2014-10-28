var bower = require('gulp-bower');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var spawn = require('child_process').spawn;
var typescript = require('gulp-tsc');

var paths = {
  ts: 'public/*.ts'
}

gulp.task('default', ['compile']);

gulp.task('compile', ['bower', 'typescript']);
gulp.task('test', ['compile']);
gulp.task('watch', function() {
  gulp.watch(paths.ts, ['typescript']);
  livereload.listen();
  gulp.watch('public/*').on('change', livereload.changed);
  spawn('npm', ['start']);
});

gulp.task('bower', function() {
  return bower();
});

gulp.task('typescript', function() {
  return gulp.src(paths.ts)
    .pipe(typescript({safe: true}))
    .pipe(gulp.dest('public/'));
});

