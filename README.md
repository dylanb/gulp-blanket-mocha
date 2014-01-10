# Gulp-Blanket-Mocha
Does a coverage report for Mocha tests

## Usage

    npm install --save-dev gulp-blanket-mocha

To use alone (note that this will also run the tests:

    gulp.task('test', function () {
        gulp.src(['tests/**/*.js'], { read: false })
            .pipe(blanket({
                instrument:['mime/mime.js'],
                captureFile: 'coverage.html',
                reporter: 'html-cov'
            }));
    });

To use in combination with Mocha tests and a test reporter:

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

Note: This will re-run the tests in order to produce the coverage report, so the tests will all run twice.

## Options

### instrument

Blanket patterns for the files to instrument. Required.

### captureFile

Output file for the coverage report. Required.

### reporter

Which coverage reporter you want to use

### ...

Any other options you want to pass to the Mocha test runner
