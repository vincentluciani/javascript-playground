var gulp = require('gulp');
var concat = require('gulp-concat');
const minify = require('gulp-minify');

gulp.task('pack-js', function () {    
    return gulp.src(['components/*.js', 'libraries/*.js', 'language/general.js','language/english.js', 'synchronization/*.js','habits_main.js'])
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('output'));
});
 

gulp.task('default', gulp.series('pack-js'));
