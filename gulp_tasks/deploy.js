var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var sshConfig = require('./sshConfig');

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: sshConfig
});

gulp.task('sendToServer', ['build'], function () {
    return gulp.src(['./www/**', '!./www/fonts/*'])
        .pipe(gulpSSH.dest('/home/nico/nuata-admin/'))
});

gulp.task('deploy', ['sendToServer'], function () {
    return gulp.src(['./www/index.html'])
        .pipe(gulpSSH.dest('/home/nico/nuata-admin/'))
});
