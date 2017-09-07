module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '; '
      },
      dist: {
        src: ['public/lib/underscore.js','public/lib/jquery.js','public/lib/backbone.js','public/lib/handlebars.js', 'public/client/*.js',  ],
        dest: 'public/dist/build.js'
      }

      
    },

    clean: ['public/dist/'],

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          env: { 
            PORT: '4569',
            HOST: 'localhost'
          }
        }
        
      },
      prod: {
        script: 'liveServer.js',
        
          
      }
        
      
    },

    uglify: {
      dev:{
        files: {
          'public/dist/build.min.js': ['public/dist/build.js']
        }

      }
     
    },
    

    eslint: {
      target: [
        // Add list of files to lint here
        'public/client/*.js'

      ]
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      liveUpload: {
        command: ['git add .', 'git commit -m "grunt commit"', 'git push live'].join("&&")
      }

    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon:prod', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [ 'clean', 'concat', 'uglify'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here


    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here
    
    'eslint', 'test', 'build','shell'
  ]);


};
