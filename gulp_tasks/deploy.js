var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var sshConfig = require('./sshConfig');

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: sshConfig
});

gulp.task('sendToServer', function () {

});

gulp.task('deploy', function () {
    return gulp.src(['www/**', '!./www/fonts/*'])
        .pipe(gulpSSH.dest('/home/nico/nuata-admin/'))
});