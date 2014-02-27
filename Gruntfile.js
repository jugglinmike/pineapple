/*global module:false*/

module.exports = function(grunt) {

  var previous_force_state = grunt.option('force');

  grunt.registerTask('force',function(set){
    if (set === 'on') {
      grunt.option('force',true);
    }
    else if (set === 'off') {
      grunt.option('force',false);
    }
    else if (set === 'restore') {
      grunt.option('force',previous_force_state);
    }
  });

  // Project configuration.
  grunt.initConfig({
    watch: {
      files: [ '<config:lint.files>', 'www/templates/*.tmpl' ],
      tasks: 'test'
    },
    jshint: {
      file: ['src/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        // In order to look and feel more like jQuery, we're going to allow the
        // tQuery function to operate as a constructor.
        newcap: false,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      tests: {
        files: {
          src: ['test/tests/**/*.js']
        },
        options: {
          globals: {
            $$: true,
            tQuery: true,
            module: true,
            test: true,
            equal: true,
            strictEqual: true,
            ok: true,
            QUnit: true,
            mocha: true
          }
        }
      }
    },
    uglify: {},
    qunit: {
      index: [ 'test/index.html' ]
    },
    mocha: {
      test:{
        options:{
          reporter: './node_modules/mocha-training-reporter',
          run: true
        },
        src: [
          'test/index.html'
        ]
      }
    },
    reporter: {
      all: {
        options: {
          // tokenRequestUri: 'http://localhost:1337/api/v2/auth',
          // testReportUri: 'http://localhost:1337/api/v2/test_snapshot',
          uploadFiles: 'src/tiny-jquery.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-training-reporter');

  grunt.registerTask('default', ['jshint',
                                 'force:on',     // temporarily turn on --force
                                 'mocha',
                                 'reporter',
                                 'force:restore' // restore previous --force state
                                ]);
};
