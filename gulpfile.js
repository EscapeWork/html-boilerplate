const gulp        = require('gulp'),
      gutil       = require('gulp-util'),
      uglify      = require('gulp-uglify'),
      favicons    = require('gulp-favicons'),
      shell       = require('gulp-shell'),
      tingpng     = require('gulp-tingpng');

gulp.task('favicons', function() {
    gulp.src('public/assets/images/icons/favicon.png')
        .pipe(favicons({
            background: '#fff',
            path: '/assets/images/icons',
            html: 'resources/views/app/inc/favicons.blade.php',
            replace: true
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/assets/images/icons'));
});

gulp.task('default', shell.task([
    'npm run dev'
]));

gulp.task('watch', shell.task([
    'npm run watch'
]));

gulp.task('production', shell.task([
    'npm run production'
]));

gulp.task('tinypng', function () {
    gulp.src(['assets/images/**/*.png', '!assets/images/icons/*.png'])
        .pipe(tingpng('OmkME2nyIucvXSZ8kwUWC8uyEJ6nZ6FV'))
        .pipe(gulp.dest('assets/images'));
});
