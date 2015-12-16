module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-standard')
  grunt.loadNpmTasks('grunt-run')

  grunt.registerTask('default', 'watch')
  grunt.registerTask('test', 'run:test')

  grunt.initConfig({
    // standard linting
    standard: {
      main: {
        options: {
          format: true,
          lint: true
        },
        src: [ 'index.js', 'Gruntfile.js', './test/**/*.js', './src/*.js' ]
      }
    },
    run: {
      test: {
        cmd: 'npm',
        args: [ 'run', 'test' ]
      }
    },
    watch: {
      everything: {
        files: [ 'index.js', 'Gruntfile.js', './test/**/*.js', './src/*.js' ],
        tasks: [ 'standard', 'run:test' ]
      }
    }
  })
}
