module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      'public/bower_components/angular/angular.js',
      'public/tests/integration.js',
      {pattern: 'public/*.js.map', included: false},
      {pattern: 'public/*.ts', included: false}
    ],
    reporters: ['mocha'],
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS'],
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  });
};
