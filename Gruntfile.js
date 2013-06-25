module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      build: {
        src:  [
          'components/in-viewport/in-viewport.js',
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

  grunt.registerTask('default', [
    'jshint',
    'concat',
    'closure-compiler',
  ]);

};