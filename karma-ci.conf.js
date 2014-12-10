module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'public/bower_components/angular/angular.js',
      'public/tests/integration.js'
    ],
    reporters: ['mocha'],
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
