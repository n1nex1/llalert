

module.exports = function (grunt) {
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src/', src: ['**'], dest: 'dist/'},
				],
			},
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'dist/llalert.js',
				dest: 'dist/llalert.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['copy', 'uglify']);
};
