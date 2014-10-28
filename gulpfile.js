var gulp = require('gulp');
var typescript = require('gulp-tsc');

gulp.task('compile', function() {
  gulp.src(['public/*.ts'])
    .pipe(typescript())
    .pipe(gulp.dest('public/'));
});

gulp.task('default', ['compile']);
gulp.task('test', ['compile']);

