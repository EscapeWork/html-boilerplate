const gulp        = require('gulp'),
      elixir      = require('laravel-elixir')
      gutil       = require('gulp-util'),
      uglify      = require('gulp-uglify'),
      favicons    = require('gulp-favicons'),
      tingpng     = require('gulp-tinypng'),
      spritesmith = require('gulp.spritesmith');

require('laravel-elixir-vue');
require('laravel-elixir-livereload');

elixir.config.sourcemaps = false;

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(mix => {
    mix.sass('main.scss', 'assets/css/main.css')
       .webpack('app/main.js', 'assets/js/app/main.js');

    mix.livereload();
});

gulp.task('imagemin', function() {
    gulp.src(['assets/images/**/*.jpg', 'assets/images/**/*.png', '!assets/images/icons', '!assets/images/vendor'])
        .pipe(tingpng('VYVWf4euo00lKqF6YczN9bx5lnPN1l1G'))
        .pipe(gulp.dest('assets/images'));
});

gulp.task('favicons', function() {
    gulp.src('assets/images/icons/favicon.png')
        .pipe(favicons({
            background: '#fff',
            path: '/assets/images/icons',
            html: 'resources/views/app/inc/favicons.blade.php',
            replace: true
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('assets/images/icons'));
});

gulp.task('sprites', function() {
    gulp.src('assets/images/sprites/default/*.png')
        .pipe(spritesmith({
            imgOutput: 'assets/images/sprites',
            imgPath: '/assets/images/sprites/sprite.png',
            cssName: '../../../../resources/assets/sass/components/_sprite.scss',
        }))
        .pipe(gulp.dest('assets/images/sprites'));
});
