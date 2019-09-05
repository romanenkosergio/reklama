const syntax = 'scss'; // Syntax: sass or scss;

const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    connect = require('gulp-connect-php'),
    notify = require("gulp-notify");

gulp.task('browser-sync', function () {
    connect.server({base: 'app'}, function () {
        browserSync({
            proxy: '127.0.0.1:8000',
            baseDir: 'app',

        });
    });
});

gulp.task('styles', function () {
    return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
        .pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss({level: {1: {specialComments: 0}}})) // Opt., comment out when debugging
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
});

gulp.task('js', function () {
    return gulp.src([
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/jquery.maskedinput.min.js',
        'app/js/index.js', // Always at the end
    ])
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))
});
gulp.task('img', () =>
    gulp.src('app/img/**/*')
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('app/images'))
);

gulp.task('watch', ['styles', 'js', 'img', 'browser-sync'], function () {
    gulp.watch('app/' + syntax + '/**/*.' + syntax + '', ['styles']);
    gulp.watch(['libs/**/*.js', 'app/js/index.js'], ['js']);
    gulp.watch(['app/img/**/*'], ['img']);
    gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);
