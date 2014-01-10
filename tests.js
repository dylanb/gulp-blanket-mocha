var assert = require('assert');
var gutil = require('gulp-util');
var blanket = require('./gulp-blanket');
var fs = require('fs');

describe('gulp-blanket', function (done) {
	it('should remoe the coverage file', function () {
		if (fs.existsSync('coverage.html')) {
			fs.unlinkSync('coverage.html');
		}
		assert(!fs.existsSync('coverage.html'));
	});
	it('generate a coverage.html file', function (done) {
		var stream = blanket({
				captureFile: 'coverage.html',
				instrument: ['fixture-pass.js']
			});

		reallyDone = function () {
			assert(true);
			done();
		};
		setInterval(function() {
			if (fs.existsSync('coverage.html')) {
				reallyDone();
			}
		}, 100);
		stream.write(new gutil.File({path: 'fixture-pass.js'}));
		stream.end();
	});
});

