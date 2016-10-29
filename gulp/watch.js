/**
 * @author Artur Atnagulov (atnartur), ClienDDev team (clienddev.ru)
 */
var gulp = require('gulp');
// var livereload = require('gulp-livereload');
var gutil = require('gulp-util');

gulp.task('watch', ['server'], function() {
    // livereload.listen();

    function cb() {
        // livereload.reload();
        global.connect.reload();
    }

    global.webpack_viewer.watch({}, function(err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);

        gutil.log("[webpack]", stats.toString({
            colors: true,
            minimal: true,
            chunks: false
        }));

        cb();
    });
});