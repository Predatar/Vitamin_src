const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const webpHtmlNosvg = require('gulp-webp-html-nosvg');
const webp = require('gulp-webp');
var webpcss = require("gulp-webpcss");
const replace = require('gulp-replace');
const gcmq = require('gulp-group-css-media-queries');
const newer = require('gulp-newer');

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('dist/css/*.css').on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return gulp
        .src('src/sass/**/**/*.+(scss|sass)', { sourcemaps: true })
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(webpcss({}))
        .pipe(replace(/@img\//g, '../img/'))
        .pipe(gcmq())
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(
            autoprefixer({
                grid: true,
                overrideBrowserslist: ['last 3 version'],
                cascade: true
            })
        )
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('src/sass/**/*.+(scss|sass|css)').on('change', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', gulp.parallel('html'));
    gulp.watch('src/html/**.html').on('change', gulp.parallel('html'));
    gulp.watch('src/js/**/*.js').on('change', gulp.parallel('scripts'));
    gulp.watch('src/icons/**/*').on('all', gulp.parallel('icons'));
    gulp.watch('src/img/**/*').on('all', gulp.parallel('images'));
});

gulp.task('html', function () {
    return gulp
        .src('src/*.html')
        .pipe(fileinclude())
        .pipe(replace(/@img\//g, 'img/'))
        .pipe(replace(/@icons\//g, 'icons/'))
        .pipe(replace(/@html\//g, ''))
        .pipe(webpHtmlNosvg())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp
        .src('src/js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
});

gulp.task('icons', function () {
    return gulp
        .src('src/icons/**/*')
        .pipe(newer('dist/icons'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/icons'));
});

gulp.task('images', function () {
    return gulp
        .src('src/img/**/*')
        .pipe(newer('dist/img'))
        .pipe(webp())
        .pipe(gulp.dest('dist/img'))
        .pipe(gulp.src('src/img/**/*'))
        .pipe(newer('dist/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});

// * ------------------------------------

gulp.task('update', gulp.parallel('styles', 'scripts', 'fonts', 'icons', 'html', 'images'));

gulp.task('default', gulp.parallel('watch', 'server', 'update'));
