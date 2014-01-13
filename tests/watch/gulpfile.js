var gulp = require('gulp'),
    blanket = require('../../gulp-blanket'),
    mocha = require('gulp-mocha');

gulp.task('blanketTest', function () {
    gulp.src(['src.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec'
        }))
        .pipe(blanket({
            instrument:['src.js'],
            captureFile: 'coverage.html',
            reporter: 'html-cov'
        }));
});

gulp.task('watch', function () {
    gulp.watch(['src.js'], function(event) {
      console.log('File '+event.path+' was '+event.type+', running tasks...');
      gulp.run('blanketTest');
    });    
});
