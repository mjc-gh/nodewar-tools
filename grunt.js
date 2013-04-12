module.exports = function(grunt) {
  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      files: ['test/**/*.js']
    },
    watch: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js'],
      tasks: 'default'
    }
  });

  // Default task.
  grunt.registerTask('default', 'test');
};
