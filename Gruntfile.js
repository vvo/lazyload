module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    'closure-compiler': {
      min: {
        js:           'lazyload.js',
        jsOutputFile: 'lazyload.min.js',
        options:      {
          compilation_level:    'ADVANCED_OPTIMIZATIONS',
          language_in:          'ECMASCRIPT5_STRICT',
          summary_detail_level: 3,
          warning_level:        'VERBOSE',
          debug:                false,
          output_wrapper:       '"(function(){%output%})();"'
        }
      }
    },

    concat: {
      options: {
        banner:       '/*! <%= pkg.name %> v<%= pkg.version %> | github.com/vvo/lazyload#licence */\n'
      },
      dist:    {
        src:  ['lazyload.min.js'],
        dest: 'lazyload.min.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['closure-compiler', 'concat']);

};
