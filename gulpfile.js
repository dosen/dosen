var gulp = require('gulp');
var spawn = require('child_process').spawn;
var tslint = require('gulp-tslint');
var typescript = require('gulp-tsc');

var paths = {
  ts: 'public/*.ts'
}

gulp.task('default', ['typescript']);

gulp.task('test', ['typescript']);
gulp.task('watch', function() {
  gulp.watch(paths.ts, ['typescript']);
  spawn('npm', ['start']);
});

gulp.task('tslint', function() {
  return gulp.src(paths.ts)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('typescript', function() {
  return gulp.src(paths.ts)
    .pipe(typescript({safe: true}))
      .on('error', function() {})
    .pipe(gulp.dest('public/'));
});
