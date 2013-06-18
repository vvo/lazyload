module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> | github.com/vvo/lazyload#license */\n',
          separator: ''
        },
        src:  [
          'components/in-viewport/build/in-viewport.min.js',
          'build/<%= pkg.name %>.min.js'],
        dest: 'build/<%= pkg.name %>.min.js'
      },
      unminified: {
        src:  [
          'components/in-viewport/in-viewport.js',
          '<%= pkg.name %>.js'],
        dest: 'build/<%= pkg.name %>.js'
      }
    },

    'closure-compiler': {
      min: {
        js: '<%= pkg.name %>.js',
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
    },
    watch: {
      files: ['<%= jshint.files %>', '.jshintrc', 'package.json'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'closure-compiler',
    'concat',
  ]);

};