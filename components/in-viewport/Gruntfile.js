module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      license: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> | github.com/vvo/in-viewport#license */\n'
        },
        src:  ['build/<%= pkg.name %>.min.js'],
        dest: 'build/<%= pkg.name %>.min.js'
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
    'concat:license'
  ]);

};
