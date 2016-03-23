
var gulp = require('gulp');
var bowerFiles = require('./my-bower-files').bowerFiles;
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var ext_replace = require('gulp-ext-replace');

gulp.task('clean-build',
    shell.task('rm -Rf www/app www/css www/fonts www/favicons www/js && rm -f www/index.html && mkdir www/css')
);


gulp.task('sass-min',
    // shell.task('sass styles/app.scss dev/css/app.min.css --style compressed')
    shell.task('sassc -t compressed scss/main.scss www/css/app.min.css')
);

gulp.task('minify-js', function() {
    // Concat and minify the js files
    gulp.src(bowerFiles.match('!**/jquery.js').ext('js').files)
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('www/js/'));

    gulp.src(['./dev/app/**/*.js', '!./dev/app/config/local/*.js'])
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('www/js/'));
});

gulp.task('copy-html', function () {
    return gulp.src('./dev/app/**/*.html').pipe(gulp.dest('www/app/'));
});

gulp.task('copy-favicons', function () {
    return gulp.src('./dev/favicons/*').pipe(gulp.dest('www/favicons/'));
});

gulp.task('copy-fonts', function () {
    return gulp.src('./dev/fonts/*').pipe(gulp.dest('www/fonts/'));
});

gulp.task('copy-jquery', function () {
    return gulp.src('./dev/lib/jquery/dist/jquery.min.js').pipe(gulp.dest('www/js/'));
});

gulp.task('copy-config', function () {
    return gulp.src('./dev/app/config/constants-server.js').pipe(gulp.dest('www/js/'));
});

gulp.task('copy-index', function () {
    return gulp.src('./dev/index.html').pipe(gulp.dest('www/'));
});

gulp.task('copy', ['copy-html', 'copy-favicons', 'copy-fonts', 'copy-jquery', 'copy-index', 'copy-config']);

gulp.task('inject', function () {
    var vendorSources = gulp.src(['www/js/lib.min.js'], {read: false});
    var sources = gulp.src(['www/js/app.min.js'], {read: false});
    var config = gulp.src(['www/js/constants-server.js'], {read: false});
    var jquery = gulp.src(['www/js/jquery.min.js'], {read: false});
    var cssSources = gulp.src(['www/css/*.css'], {read: false});

    gulp.src('www/index.html')
        .pipe(inject(vendorSources, {relative: false, name: 'vendor', ignorePath: 'www/', addRootSlash: false}))
        .pipe(inject(sources, {relative: false, name: 'app', ignorePath: 'www/', addRootSlash: false}))
        .pipe(inject(config, {relative: false, name: 'config', ignorePath: 'www/', addRootSlash: false}))
        .pipe(inject(jquery, {relative: false, name: 'jquery', ignorePath: 'www/', addRootSlash: false}))
        .pipe(inject(cssSources, {relative: true, name: 'style'}))
        .pipe(gulp.dest('www'));
});

gulp.task('build', function (done) {
    runSequence(
        ['clean-build', 'sass-min', 'minify-js'],
        'copy',
        'inject',
        done
    );
});
