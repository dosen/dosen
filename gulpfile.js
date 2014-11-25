var foreach = require("gulp-foreach");
var gulp = require("gulp");
var karma = require('karma').server;
var spawn = require("child_process").spawn;
var tslint = require("gulp-tslint");
var typescript = require("gulp-tsc");

var paths = {
  ts: "public/*.ts",
  tsTests: "public/tests/**/*.ts"
}

gulp.task("default", ["typescript"]);

gulp.task("test", ["checkDependencies", "tslint"]);
gulp.task("watch", function() {
  gulp.watch(paths.ts, ["typescript"]);
  gulp.watch(paths.tsTests, ["ts-tests"]);
  spawn("npm", ["start"]);
});

gulp.task("karma", ["ts-tests"], function (done) {
  karma.start({
    configFile: __dirname + "/karma-ci.conf.js"
  }, done);
});

gulp.task("tslint", function() {
  return gulp.src(paths.ts)
    .pipe(tslint())
    .pipe(tslint.report("verbose"));
});

gulp.task("checkDependencies", function() {
  return gulp.src(paths.ts)
    .pipe(foreach(function(stream, file){
      return stream
        .pipe(typescript({
          noImplicitAny: true
        }));
    }));
});

gulp.task("typescript", function() {
  return gulp.src(paths.ts)
    .pipe(typescript({
      emitError: false,
      noImplicitAny: true,
      safe: true,
      out: "dosenApp.js",
      outDir: "public/",
      sourcemap: true
    }))
    .pipe(gulp.dest("public/"));
});

gulp.task("ts-tests", function() {
  return gulp.src(paths.tsTests)
    .pipe(typescript({
      emitError: false,
      noImplicitAny: true,
      safe: true,
      outDir: "public/",
      sourcemap: true
    }))
    .pipe(gulp.dest("public/"));
});
