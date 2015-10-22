var gulp = require('gulp');
var babel = require('gulp-babel');
var path = require('path');

var BUILD_DIR = 'dist';
var SRC_DIR = 'src';

gulp.task('default', function() {
    return gulp.src(path.join(SRC_DIR, '*.babel'))
               .pipe(babel())
               .pipe(gulp.dest(BUILD_DIR));
});
