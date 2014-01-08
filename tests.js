'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var mocha = require('./gulp-blanket-mocha');
var fs = require('fs');

var out = process.stdout.write.bind(process.stdout);
var err = process.stderr.write.bind(process.stderr);

describe('gulp-blanket-mocha', function () {
	it('should have removed a coverage.html file', function() {
		if (fs.existsSync('coverage.html')) {
			fs.unlinkSync('coverage.html');
		}
		assert.ok(!fs.existsSync('coverage.html'));
	});
	it('should run unit test and pass', function (cb) {
		var stream = mocha({
			instrument: ['fixture-pass.js']
		});

		process.stdout.write = function (str) {
			if (/1 passing/.test(str)) {
				assert(true);
			}
			process.stdout.write = out;
			cb();
		};

		stream.write(new gutil.File({path: 'fixture-pass.js'}));
		stream.end();
	});
	it('should run failing unit test', function (cb) {
		var stream = mocha({
			captureFile: 'coverage.html',
			instrument: ['fixture-fail.js']
		});

		process.stderr.write = function (str) {
			if (/1 failing/.test(str)) {
				process.stderr.write = err;
				assert.ok(true);
				cb();
			}
		};

		stream.on('error', function () {});
		stream.write(new gutil.File({path: 'fixture-fail.js'}));
		stream.end();
	});
	it('should have created a coverage.html file', function() {
		assert.ok(fs.existsSync('coverage.html'));
	});
});

