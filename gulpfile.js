"use strict";

const gulp       = require('gulp');
const babel      = require('gulp-babel');
const plumber    = require('gulp-plumber');
const notify     = require('gulp-notify');
const minifyCss  = require('gulp-minify-css'); // css压缩
const rename     = require('gulp-rename');
const uglify     = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

const browserify = require('browserify');
const source     = require('vinyl-source-stream');
const buffer     = require('vinyl-buffer');

const onError = err => {
    notify.onError({
        title: "Error",
        message: err.message.replace(/.+\/(.+\.(jsx|js).+)/g, '$1'),
        // message: err.message,
        sound: "Beep"
    })(err);
};

gulp.task('uglify', ['bundle'], () => {
    gulp.src('./dist/react-drag-selector.js').pipe(uglify({
        compress: {
            global_defs: {
                Selector: false
            }
        }
    })).pipe(rename({
        suffix: '.min'
    })).pipe(gulp.dest('dist'));
});

gulp.task('bundle', ['script'], () => {
    const bundle = browserify({
        entries: './lib/picker',
        standalone: 'DateTimeRangePicker',
        shim: {
            "react": {
                "exports": "global:React"
            },
            "react-dom": {
                "exports": "global:ReactDOM"
            }
        }
    });

    return bundle.bundle().pipe(source("react-bootstrap-datetime-range-picker.js")).pipe(buffer()).pipe(gulp.dest("./dist"));
});

gulp.task('script', () => (
    gulp.src(['./src/**/*.js', './src/**/*.jsx']).pipe(plumber({
        errorHandler: onError
    })).pipe(babel({
        compact: false,
        presets: ["react"],
        plugins: [
            "transform-es2015-modules-commonjs",
            "transform-object-rest-spread"
        ]
    })).pipe(plumber({
        errorHandler: onError
    })).pipe(rename({
        extname: '.js'
    })).pipe(gulp.dest('lib'))
));

gulp.task('stylesheet', () => (
    gulp.src('./src/**/*.css').pipe(minifyCss()).pipe(gulp.dest('./dist'))
));

gulp.task('watch', () => {
    gulp.watch(['./src/**/*.js', './src/**/*.jsx'], ['script', 'bundle']);
});

gulp.task('deploy', ['stylesheet', 'script', 'bundle', 'uglify']);
gulp.task('default', ['stylesheet', 'script', 'bundle', 'watch']);