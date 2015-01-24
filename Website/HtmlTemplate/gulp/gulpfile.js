/**
 *  Usage:
 *      Once per computer: 
 *             npm install -g gulp
 *
 *      Once per project: 
 *             cd gulp-simple
 *             npm install
 *             gulp
 *
**/

// include gulp and all plugins
var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    notify       = require('gulp-notify'),
    browserSync  = require('browser-sync'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pixrem       = require('gulp-pixrem');

// make plumber with error handler attached
var drano = function(){
    return plumber({
        errorHandler: function(err) {
            notify.onError({ title: "<%= error.plugin %>", message: "<%= error.message %>", sound: "Beep" })(err);
            this.emit('end');
        }
    });
};


// setup some variables with paths
// Change these variables to suit your project
var root = "../";

var css = {
    src: root + "scss/**.scss",
    watch: root + "scss/**.scss",
    dest: root + "css/"
};



// create server with browserSync
gulp.task('connect', function(){

    // http://www.browsersync.io/docs/options/
    browserSync({
        server: root,
        // proxy: "your-url-here" // http://www.browsersync.io/docs/options/#option-proxy
        port: 8080,
        open: false, //  "external" or false
        notify: false,
        ghostMode: false,
        files: [  // reload when these files change
            root + "css/*.css",
            root + "index.html"
        ]
    });

});

// compile sass, apply autoprefixer and pixrem
gulp.task('css', function(){

    return gulp.src(css.src)
        .pipe(drano())
        .pipe(sass())
        .pipe(pixrem())
        .pipe(autoprefixer())
        .pipe(gulp.dest(css.dest));
});


// create watch task
gulp.task('watch', function(){
    gulp.watch(css.watch, ['css']);
}); 


// default task (run when you run 'gulp')
gulp.task('default', ['connect', 'watch', 'css']);

