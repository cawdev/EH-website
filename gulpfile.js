var gulp = require('gulp'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	watch = require('gulp-watch');

// minify css
gulp.task('minify-css', function() {
    gulp.src(['css/*.css', '!css/*.min.css'])
	    .pipe(autoprefixer('last 2 version'))
	    .pipe(concat('style.min.css'))
	    .pipe(cleanCSS({compatibility: 'ie8'}))
	    .pipe(gulp.dest('css'))
});

// minify js
gulp.task('minify-js', function() {
    gulp.src(['js/*.js', '!js/*.min.js'])
	    .pipe(concat('scripts.min.js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('js'));
});

// watch
gulp.task('watch', function() {
	gulp.watch('css/*.css', ['minify-css']);
	gulp.watch('js/*.js', ['minify-js']);
});

gulp.task('default', ['minify-css', 'minify-js'], function(){});


