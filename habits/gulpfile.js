var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var deleteLines = require('gulp-delete-lines');
var fs = require('fs');

var newVersion = '39'
var versionNumberCodeJS = "var versionNumber = '"+newVersion+"'";
var versionNumberCodeHTML = 'https://www.vincent-luciani.com/discipline/manifest.json?version='+newVersion;
var newValue = '<script type="text/javascript" src="output/bundle-min.js"></script> '
var outputFolder = '/Users/vincentluciani/Software/Web/vincent-luciani.com/apache/staging/public-html/discipline'


gulp.task('put-client-id-html', function(){
    return gulp.src(['adding_habits.html'])
    .pipe(replace('YOUR_GOOGLE_CLIENT_ID', fs.readFileSync('googleclientid.txt', 'utf8'))) 
    .pipe(rename('adding_habits_transformed.html'))
    .pipe(gulp.dest('.'));

})
gulp.task('pack-js', function () {    
    return gulp.src(['components/*.js', 'libraries/random.js', 'libraries/loadDOMAndWait.js','libraries/date.js','libraries/http.js','libraries/pwa.js','language/general.js','language/english.js', 'synchronization/*.js','habits_main.js'])
        .pipe(concat('bundle.js'))
        .pipe(replace(/var versionNumber = '([0-9])*'/g, versionNumberCodeJS))      
        .pipe(replace('http://localhost:5001', 'https://www.vincent-luciani.com/api/discipline'))
        .pipe(replace('http://localhost:3000', 'https://www.vincent-luciani.com'))
        .pipe(minify())
        .pipe(gulp.dest('output'));
});

gulp.task('send-images', function () {    
    return gulp.src(['victory-big-2.webp'])
        .pipe(gulp.dest(outputFolder));
});

gulp.task('send-manifest', function () {    
    return gulp.src(['manifest.json'])
        .pipe(replace('http://localhost:3000','https://www.vincent-luciani.com/discipline'))
        .pipe(gulp.dest(outputFolder));
});



gulp.task('copy-resources', function () {    
    return gulp.src(['resources/*.*'])
        .pipe(gulp.dest(outputFolder+"/resources"));
});

gulp.task('copy-icons', function () {    
    return gulp.src(['images/icons/*.*'])
        .pipe(gulp.dest(outputFolder+"/images/icons"));
});

gulp.task('pack-css', function () {    
    return gulp.src(['components/*.css'])
        .pipe(replace('http://localhost:3000','https://www.vincent-luciani.com/discipline'))
        .pipe(concat('bundle.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('output'));
});

gulp.task('send-sw-js', function () {    
    return gulp.src(['sw.js'])
        .pipe(replace('"http://localhost:3000/manifest.json",','http://www.vincent-luciani.com/discipline/manifest.json'))
        .pipe(replace('"http://localhost:3000/language/general.js",',''))
        .pipe(replace('"http://localhost:3000/language/english.js",',''))
        .pipe(replace('"http://localhost:3000/libraries/date.js",',''))
        .pipe(replace('"http://localhost:3000/libraries/random.js",',''))
        .pipe(replace('"http://localhost:3000/libraries/http.js",',''))
        .pipe(replace('"http://localhost:3000/libraries/loadDOMAndWait.js",',''))
        .pipe(replace('"http://localhost:3000/libraries/pwa.js",',''))
        .pipe(replace('"http://localhost:3000/habits_main.js",',''))
        .pipe(replace('"http://localhost:3000/components/full.css",',''))
        .pipe(replace('"http://localhost:3000/components/checkboxWithTitle.js",',''))
        .pipe(replace('"http://localhost:3000/components/weekTable.js",',''))
        .pipe(replace('"http://localhost:3000/components/weekDaySelector.js",',''))
        .pipe(replace('"http://localhost:3000/components/habit.js",',''))
        .pipe(replace('"http://localhost:3000/components/journal.js",',''))
        .pipe(replace('"http://localhost:3000/components/progress.js",',''))
        .pipe(replace('"http://localhost:3000/components/graph.js",',''))
        .pipe(replace('"http://localhost:3000/components/dailySummary.js",',''))
        .pipe(replace('"http://localhost:3000/components/radialprogress.js",',''))
        .pipe(replace('"http://localhost:3000/components/encourage.js",',''))
        .pipe(replace('"http://localhost:3000/components/countdown.js",',''))
        .pipe(replace('"http://localhost:3000/synchronization/pushProgressToQueue.js",',''))
        .pipe(replace('"http://localhost:3000/synchronization/storage.js",',''))
        .pipe(replace('"http://localhost:3000/synchronization/sendPost.js",',''))
        .pipe(replace('"http://localhost:3000/synchronization/debugTools.js",',''))
        .pipe(replace('"http://localhost:3000/components/icons.js",',''))
        .pipe(replace('"http://localhost:3000/components/authentication.js",',''))
        .pipe(replace('"http://localhost:3000/synchronization/readQueue.js",',''))
        .pipe(replace('http://localhost:3000', 'https://www.vincent-luciani.com/discipline'))
        .pipe(replace('http://localhost:5001', 'https://www.vincent-luciani.com/api/discipline'))  
        .pipe(replace(/var versionNumber = '([0-9])*'/g, versionNumberCodeJS))      
        .pipe(deleteLines({"filters":[/^\s*$/]}))
        .pipe(minify())
        .pipe(rename('sw.js'))
        .pipe(gulp.dest(outputFolder));
});


gulp.task('process-html', function () {    
    return gulp.src(['adding_habits_transformed.html'])
        .pipe(replace(/http:\/\/localhost:3000\/manifest\.json\?version=\d+/g, versionNumberCodeHTML))
      /*  .pipe(replace('http://localhost:3000/manifest.json','https://www.vincent-luciani.com/discipline/manifest.json')) */
        .pipe(replace('<script type="text/javascript" src="synchronization/readQueue.js"></script>','<script>'+fs.readFileSync('output/bundle-min.js', 'utf8')+'</script>'))         
        .pipe(replace('<link rel="stylesheet" href="components/full.css">', '<style>'+fs.readFileSync('output/bundle.css', 'utf8')+'</style>'))  
        .pipe(replace(/<script\s+type="text\/javascript"\s+src="[^"]*"><\/script>/g,''))
        /*.pipe(replace('<script type="text/javascript" src="language/general.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="language/english.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="libraries/date.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="libraries/random.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="libraries/http.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="libraries/components.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="libraries/loadDOMAndWait.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="libraries/pwa.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="habits_main.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/checkboxWithTitle.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/weekTable.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/weekDaySelector.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/habit.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/journal.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/progress.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/graph.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/dailySummary.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/radialprogress.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/encourage.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/countdown.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="synchronization/pushProgressToQueue.js"></script>','')) 
        .pipe(replace('<script type="text/javascript" src="synchronization/storage.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="synchronization/sendPost.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="synchronization/debugTools.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/icons.js"></script>',''))
        .pipe(replace('<script type="text/javascript" src="components/authentication.js"></script>',''))*/
        .pipe(replace('http://localhost:3000', 'https://www.vincent-luciani.com/discipline'))
        .pipe(replace('http://localhost:5001', 'https://www.vincent-luciani.com/api/discipline'))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename('index.html'))
        /*.pipe(gulp.dest('output'));*/
        .pipe(gulp.dest(outputFolder));
});
gulp.task('default', gulp.series(['send-images','send-sw-js','copy-resources','copy-icons','send-manifest','put-client-id-html','pack-js','pack-css','process-html']));