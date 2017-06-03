var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
// var uglify = require('gulp-uglify');
// var postcss = require('gulp-postcss');
// var autoprefixer = require('autoprefixer');
// var sourcemaps = require('gulp-sourcemaps');
// var cssnano = require('gulp-cssnano');
// var clean = require('gulp-clean');
// var htmlmin = require('gulp-htmlmin');
// var sitemap = require('gulp-sitemap');
//
// // create sourcemap, minifiy js
// gulp.task('js', function() {
//   gulp.src('src/assets/js/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(uglify())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./dist/assets/js'));
// });
//
// // create sourcemap, autoprefix, minify css
// gulp.task('css', function() {
//   return gulp.src('src/assets/css/*.css')
//     .pipe(sourcemaps.init())
//     .pipe(postcss([autoprefixer({
//       browsers: ['last 1 version']
//     })]))
//     .pipe(cssnano())
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('./dist/assets/css'));
// });
//
// //htmlmin
// gulp.task('htmlmin', function() {
//   return gulp.src('./src/**/*.html')
//     .pipe(htmlmin({
//       collapseWhitespace: true
//     }))
//     .pipe(gulp.dest('./dist'));
// });
//
// //copy
// gulp.task('copy', function() {
//   gulp.src('./src/**/*.{png,jpg,svg,ico,xml,json,txt,eot,ttf,woff,woff2,otf,ttf,php,pdf}')
//     .pipe(gulp.dest('./dist'));
// });
//
// //create sitemap.xml
// gulp.task('sitemap', function() {
//   gulp.src('./src/**/*.html', {
//       read: false
//     })
//     .pipe(sitemap({
//       siteUrl: 'https://www.renansigolo.com.br'
//     }))
//     .pipe(gulp.dest('./dist'));
// });

// Watch Preprocessors

//Concat Modules
var jsFiles = [
  "preprocessors/js/app.js",
  "preprocessors/js/route.js",
  "preprocessors/js/controllers/**/*"
];

//Concat Scripts
gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dev/assets/js/'));
});

//Watch
gulp.task('watch', function() {
  gulp.watch('preprocessors/**/*', ['scripts']);
});

// Default task
gulp.task('default', ['htmlmin', 'css', 'js', 'copy', 'sitemap']);
