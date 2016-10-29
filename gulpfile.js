var gulp = require('gulp');

require('./gulp/viewer');
require('./gulp/server');
require('./gulp/watch');

gulp.task('default', ['viewer']);