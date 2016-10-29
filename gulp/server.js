var gulp = require('gulp');
var connect = require('gulp-connect');

global.connect = connect;

gulp.task('server', function(){
    connect.server({
        root: 'public/',
        livereload: true
    });
});
