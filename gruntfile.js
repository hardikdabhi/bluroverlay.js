module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
		uglify: {
			dist: {
				options: {
					banner: '/* bluroverlay.js v1.0.0 - twinkle katoch & hardik dabhi */\n'
				},
				files: {
					"dist/bluroverlay.min.js": "dist/bluroverlay.js",
				}
			}
		},
		watch: {
			scripts: {
				files: ['dist/*.js'], // which files to watch
				tasks: ['uglify'],
				options: {
					nospawn: true
				}
			}
		}
	});
	
	grunt.registerTask('default', ['uglify', 'watch']);
};
