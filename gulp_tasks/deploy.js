var gulp = require('gulp');
var GulpSSH = require('gulp-ssh');
var sshConfig = require('./sshConfig');

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: sshConfig
});

gulp.task('deploy', function () {
    return gulpSSH
        .shell(['cd votcast-lp', './update.sh'], {filePath: 'commands.log'})
        .pipe(gulp.dest('logs'))
});