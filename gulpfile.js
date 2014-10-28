var bower = require('gulp-bower');
var gulp = require('gulp');
var typescript = require('gulp-tsc');

gulp.task('default', ['compile']);

gulp.task('compile', ['bower', 'typescript']);
gulp.task('test', ['compile']);

gulp.task('bower', function() {
  return bower();
});

gulp.task('typescript', function() {
  return gulp.src(['public/*.ts'])
    .pipe(typescript())
    .pipe(gulp.dest('public/'));
});

