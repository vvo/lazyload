module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      build: {
        src:  [
          'node_modules/in-viewport/in-viewport.js',
          '<%= pkg.name %>.js'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    'closure-compiler': {
      min: {
        js: 'build/<%= pkg.name %>.js',
        jsOutputFile: 'build/<%= pkg.name %>.min.js',
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS'
        }
      }
    },

    jshint: {
      files: ['<%= pkg.name %>.js', 'package.json'],
      options: {
        jshintrc: '.jshintrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', [
    'jshint',
    'concat',
    'closure-compiler',
  ]);

};