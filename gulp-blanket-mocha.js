'use strict';
var requireLike = require('require-like');
var path = require('path');
var through = require('through');
var gutil = require('gulp-util');
var mochaRequire = requireLike(require.resolve('mocha'), true);
var fs = require('fs');
var hooker = require('./hooker');
var blanket = require('blanket');

module.exports = function (options) {
	var Mocha = mochaRequire('mocha'),
		test = new Mocha(options && options.test || {}),
		cover = new Mocha(options && options.coverage || {});

	Object.keys(require.cache).forEach(function (key) {
		delete require.cache[key];
	});
	blanket({
		pattern : options.instrument
	});
	return through(function (file) {
		test.addFile(file.path);
		cover.addFile(file.path);
		this.emit('data', file);
	}, function () {
		try {
			test.run(function (errCount) {
				var fd;
				try {
					if (options.captureFile) {
						fd = fs.openSync(process.cwd() + '/' + options.captureFile, 'w');
					}
					hooker.hook(process.stdout, 'write', {
						// This gets executed before the original process.stdout.write
						pre: function(result) {
							// Write result to file if it was opened
							if (fd) {
								fs.writeSync(fd, result);
							}
							return hooker.preempt();
						}
					});
					cover.run(function (errCount) {
						if (fd) {
							fs.closeSync(fd);
						}
						// Restore process.stdout.write to its original value
						hooker.unhook(process.stdout, 'write');
						this.emit('end');
					}.bind(this));
				} catch (err) {
					this.emit('error', new Error('gulp-blanket-mocha: ' + err));
				}
			}.bind(this));
		} catch (err) {
			this.emit('error', new Error('gulp-blanket-mocha: ' + err));
		}
	});
};