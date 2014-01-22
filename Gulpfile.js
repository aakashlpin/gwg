/**
 * Created by aakash on 1/23/14.
 */
//http://markgoodyear.com/2014/01/getting-started-with-gulp/
//TODO create a build task

// Include gulp
var gulp = require('gulp');
var gutil = require('gulp-util');

// Include Our Plugins
//var jshint = require('gulp-jshint');
var compass = require('gulp-compass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('connect');
var http = require('http');
var path = require('path');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

gulp.task('webserver', function() {
  var app, base, directory, hostname, port;
  port = 8000;
  hostname = null;
  base = path.resolve('./app');
  directory = path.resolve('./app');
  app = connect().use(connect["static"](base)).use(connect.directory(directory));
  return http.createServer(app).listen(port, hostname);
});

gulp.task('compass', function() {
  gulp.src('./app/styles/*.scss')
    .pipe(compass({
      css: './app/css',
      sass: './app/styles',
      importPath: './app/bower_components'
    }))
    .pipe(autoprefixer("last 1 version"))
    .pipe(gulp.dest('./app/css'))
    .pipe(refresh(server));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  gulp.src('./app/scripts/*.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest('./app/build/scripts'))
    .pipe(refresh(server));
});

gulp.task('livereload', function() {
  server.listen(35729, function(err) {
    if (err) return console.err(err);
  })
});

// Default Task
gulp.task('default', function(){
  gulp.run('webserver', 'livereload', 'compass', 'scripts');

  // Watch For Changes To Our JS
  gulp.watch('./app/scripts/*.js', function(){
    gulp.run('scripts');
  });

  // Watch For Changes To Our SCSS
  gulp.watch('./app/styles/*.scss', function(){
    gulp.run('compass');
  });
});