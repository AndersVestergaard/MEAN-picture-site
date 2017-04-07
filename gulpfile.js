// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');

var exec = require('child_process').exec;

function runCommand(command) {
    return function (cb) {
        exec(command, function (err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            cb(err);
        });
    }
}
gulp.task('start-mongo', runCommand('mongod'));
// gulp.task('start-mongo', runCommand('mongod --dbpath ./data/'));

gulp.task('sass', function () {
    gulp.src('public/stylesheets/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function (f) {
            return f.base;
        }))


});

var tsProject = ts.createProject('tsconfig.json');


gulp.task('typescript', function () {
    var tsResult =
        gulp.src(['hoey-scripts/**/*.ts', 'frontend-setup/**/*.ts', '*.ts', '!**/*.d.ts', '!node_modules/**'])
            .pipe(tsProject())
            .pipe(gulp.dest(function (f) {
                return f.base;
            }))
            
});


gulp.task('browser-sync', ['nodemon'], function () {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*", "views/**/*.*"],
        browser: "chrome.exe",

        port: 7000,
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;

    gulp.watch(['hoey-scripts/**/*.ts'
        , 'frontend-setup/**/*.ts', '*.ts'],
        ['typescript']);

    gulp.watch('public/stylesheets/**/*.scss', ['sass']);


    console.log("Hello World12");
    return nodemon({
        script: 'bin/www',
        nodeArgs: ['--debug']
    })
        .on('start', function () {


            // to avoid nodemon being started multiple times
            console.log("Hello World2");
            if (!started) {
                cb();
                started = true;
            }else{
                browserSync.reload();
            }


        });
});


//Default task
//gulp.task('default', ['start-mongo','sass', 'typescript', 'browser-sync'], function () {
gulp.task('default', ['start-mongo', 'browser-sync'], function () {
    // gulp.watch('public/stylesheets/*.scss', ['sass']);
    //gulp.watch(['hoey-scripts/**/*.ts', '*.ts'], ['typescript']);

})