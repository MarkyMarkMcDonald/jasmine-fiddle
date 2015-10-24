var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var ghPages = require('gulp-gh-pages');
var ngAnnotate = require('gulp-ng-annotate');
var merge2 = require('merge2');

gulp.task('concatParentJs', function () {
  var thirdParty = gulp.src([
      'bower_components/esprima/esprima.js',
      'bower_components/ace-builds/src-noconflict/ace.js',
      'bower_components/ace-builds/src-noconflict/ext-language_tools.js',
      'bower_components/ace-builds/src-noconflict/mode-javascript.js',
      "bower_components/angular/angular.js",
      "bower_components/angular-ui-ace/ui-ace.js",
  ]);

  var firstParty = gulp.src([
    'parent_scripts/app.js',
    'parent_scripts/*.js'
  ]).pipe(ngAnnotate());

  return merge2(thirdParty, firstParty)
    .pipe(concat('parent-script.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('concatIframeJs', function () {
  return gulp.src([
      "bower_components/jasmine-core/lib/jasmine-core/jasmine.js",
      "bower_components/jasmine-core/lib/jasmine-core/jasmine-html.js",
      "iframe_scripts/*",
    ])
    .pipe(concat('iframe-script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('aceWorker', function () {
  return gulp.src(
      'bower_components/ace-builds/src-noconflict/worker-javascript.js'
    )
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('copyPublic', function () {
  return gulp.src('public/*')
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', function() {
  return gulp.src([
      'styles/reset.css',
      'styles/main.css',
    ])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist'));
})

gulp.task('deploy', ['default'], function() {
  return gulp.src('dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['concatParentJs', 'concatIframeJs', 'aceWorker', 'copyPublic', 'styles']);
