var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

// Watch Preprocessors

//Concat Modules
var jsFiles = [
  "preprocessors/js/app.js",
  "preprocessors/js/route.js",
  "preprocessors/js/timer.js",
  "preprocessors/js/controllers/**/*",
];

var jsLibs = [
  "node_modules/angular-ui-router/release/angular-ui-router.min.js",
  "node_modules/angularfire/dist/angularfire.min.js",
];

var watchList = [
  'preprocessors/**/*',
  'node_modules/**/*'
];

//Concat Scripts
gulp.task('concatScripts', function () {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dev/assets/js/'));
});

//Concat Libs
gulp.task('concatLibs', function () {
    return gulp.src(jsLibs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('dev/assets/js/'));
});

//Watch
gulp.task('watch', function () {
    gulp.watch(watchList, ['concatScripts', 'concatLibs']);
});

// Default task
gulp.task('default', ['concatScripts', 'concatLibs']);