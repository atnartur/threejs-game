/**
 * @author Artur Atnagulov (atnartur), ClienDDev team (clienddev.ru)
 */
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('watch', ['server'], function() {
    function cb() {
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