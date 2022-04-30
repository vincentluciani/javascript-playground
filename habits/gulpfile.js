var gulp = require('gulp');
var concat = require('gulp-concat');
const minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var fs = require('fs');

var newValue = '<script type="text/javascript" src="output/bundle-min.js"></script> '

gulp.task('pack-js', function () {    
    return gulp.src(['components/*.js', 'libraries/random.js', 'language/general.js','language/english.js', 'synchronization/*.js','habits_main.js'])
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
        .pipe(replace('<link rel="stylesheet" href="components/full.css">', '<style>'+fs.readFileSync('output/bundle.css', 'utf8')+'</style>'))  
        .pipe(replace('<script type="text/javascript" src="language/general.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="language/english.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="libraries/date.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="libraries/random.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="habits_main.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/weekTable.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/weekDaySelector.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/habit.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/journal.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/progress.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="<script type="text/javascript" src="components/radialprogress.js"></script>"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/encourage.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="synchronization/pushProgressToQueue.js"></script>','')) 
        .pipe(replace('<script type="text/javascript" src="synchronization/debugTools.js"></script>',''))
         
        .pipe(replace('<script type="text/javascript" src="synchronization/readQueue.js"></script>','<script>'+fs.readFileSync('output/bundle-min.js', 'utf8')+'</script>'))   
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('output'));
});


gulp.task('default', gulp.series(['pack-js','pack-css','process-html','pack-service-worker']));
