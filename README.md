# Gulp-Blanket-Mocha
## Usage

    npm install --save-dev gulp-blanket-mocha

    gulp.task('test', function () {
        gulp.src(['tests/**/*.js'], { read: false })
            .pipe(blanket({
                instrument:['mime/mime.js'],
                captureFile: 'coverage.html',
                coverage : {
                    reporter: 'html-cov'
                },
                test : {
                    reporter: 'spec'
                }
            }));
    });

## Options

### instrument

Blanket patterns for the files to instrument. Required.

### captureFile

Output file for the coverage report. Required.

### coverage

Your Mocha options for the coverage run

### test

Your Mocha options for the test run

## Known problems

Does not work with gulp.watch - this is due to Mocha's resolve caching - don't know how to solve this, if you know, give me a shout