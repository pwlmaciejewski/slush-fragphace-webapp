var gulp = require('gulp');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var inquirer = require('inquirer');

gulp.task('default', function (done) {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: 'Give your app a name'
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continue?'
  }], function (answers) {
    if (!answers.moveon) return done();

    const src = [
      __dirname + '/templates/webapp/**'
    ];

    gulp
      .src(src, { dot: true })
      .pipe(template(answers))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .on('end', function () {
        done();
      })
      .resume();
  });
});
