var gulp = require('gulp');
var connect = require('gulp-connect');
var traceur = require('gulp-traceur');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

// To inject js or css dependencies in index.html
// Tasks
require('./gulp_tasks/auto-include');
require('./gulp_tasks/auto-prefixer');
require('./gulp_tasks/deploy');
//require('./gulp_tasks/sass');
require('./gulp_tasks/build');
gulp.task('connect', function () {
    connect.server({
        root: 'dev',
        livereload: true,
        port: 8000
    });
});

gulp.task('buildEs5', function () {
    return gulp.src('dev/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(traceur())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dev/js/'));
});

gulp.task('reload', function () {
    gulp.src(['./dev/**/*.html', './dev/app/**/*.js', './dev/css/*.css'])
        .pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch']);

gulp.task('watch', function () {
    gulp.watch('dev/app/**/*.html', ['ai', 'reload']);
    gulp.watch('dev/app/**/*.js', ['buildEs5', 'ai', 'reload']);
    //gulp.watch(['dev/**/*.scss', 'scss/*.scss'], ['sass']);
    gulp.watch('dev/css/main.css', ['ai', 'reload']);
    gulp.watch('dev/lib/**/.js', ['ai', 'reload']);
    gulp.watch('bower.json', ['ai']);
});
