var gulp = require('gulp');
var connect = require('gulp-connect');

// To inject js or css dependencies in index.html
// Tasks
require('./gulp_tasks/auto-include');
require('./gulp_tasks/auto-prefixer');
require('./gulp_tasks/deploy');
require('./gulp_tasks/build');

gulp.task('connect', function () {
    connect.server({
        root: 'dev',
        livereload: true,
        port: 8000
    });
});

gulp.task('reload', function () {
    gulp.src(['./dev/**/*.html', './dev/app/**/*.js', './dev/css/*.css'])
        .pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch']);

gulp.task('watch', function () {
    gulp.watch('dev/app/**/*.html', ['ai', 'reload']);
    gulp.watch('dev/app/**/*.js', ['ai', 'reload']);
    gulp.watch('dev/css/*.css', ['ai', 'reload']);
    gulp.watch('dev/lib/**/.js', ['ai', 'reload']);
    gulp.watch('bower.json', ['ai']);
});
