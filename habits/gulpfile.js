var gulp = require('gulp');
var concat = require('gulp-concat');
const minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var fs = require('fs');

gulp.task('pack-js', function () {    
    return gulp.src(['components/*.js', 'libraries/*.js', 'language/general.js','language/english.js', 'synchronization/*.js','habits_main.js'])
        .pipe(concat('bundle.js'))
        .pipe(minify())
        .pipe(gulp.dest('output'));
});
 
gulp.task('pack-service-worker', function () {    
    return gulp.src(['sw.js'])
        .pipe(minify())
        .pipe(gulp.dest('output'));
});

gulp.task('pack-css', function () {    
    return gulp.src(['components/*.css'])
        .pipe(concat('bundle.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('output'));
});

gulp.task('process-html', function () {    
    return gulp.src(['adding_habits.html'])
        .pipe(replace('<script type="text/javascript" src="output/bundle-min.js"></script>', '<script>'+fs.readFileSync('output/bundle-min.js', 'utf8')+'</script>'))
        .pipe(replace('<link rel="stylesheet" href="components/full.css">', '<style>'+fs.readFileSync('output/bundle.css', 'utf8')+'</style>'))   
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('output'));
});

gulp.task('default', gulp.series(['pack-js','pack-css','process-html']));
