const gulp = require('gulp');
const del = require('del');
const exec = require('child_process').exec;

function preClean() {
  return del(['./dist']);
}

function copyConfig() {
  return gulp.src([
    'tsconfig-dist.json',
    'package.json',
    'index.ts'
  ]).pipe(gulp.dest('./dist'));
}

function copySrc() {
  return gulp.src([
    './src/**/*.ts',
    '!./src/**/*.spec.ts'
  ]).pipe(gulp.dest('./dist/src'));
}

function transpile(done) {
  exec('"node_modules/.bin/ngc" -p "./dist/tsconfig-dist.json"', function(err, stdout, stderr){
    if (stdout){ console.log(stdout);}
    if (stderr) { console.error(stderr);}
    done(err);
  });
}

function postClean() {
  return del([
    './dist/tsconfig-dist.json',
    './dist/**/*.ts',
    './dist/**/*.map',
    '!./dist/**/*.d.ts'
  ]);
}

gulp.task('default', gulp.series(
  preClean,
  copySrc,
  copyConfig,
  transpile,
  postClean
));
gulp.task('default').description = "Zorbit API Package Build.";