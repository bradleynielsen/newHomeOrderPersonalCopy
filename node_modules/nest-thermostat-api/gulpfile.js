/*jshint node:true */
var fs = require('fs');

require('coffee-script/register');

var gulp = require('gulp');
var watch = require('gulp-watch');
var mocha = require('gulp-mocha');

gulp.task('mocha', function() {
    var mocha_opts = {};

    try {
        var opts = fs.readFileSync('test/mocha.opts', 'utf8')
            .trim()
            .split(/\s+/);

        opts.forEach(function(val, indx, arry) {
            if (/^-.+?/.test(val)) {
                val = val.replace(/^-+(.+?)/, '$1');
                mocha_opts[val] = arry[indx + 1];
            }
        });

    } catch (err) {
      // ignore
    }

    return watch({ glob: 'test/**/*.coffee', read:false }, function(files) {

        files
            .pipe(mocha(mocha_opts))
                .on('error', function(err) {
                    if (!/tests? failed/.test(err.stack)) {
                        console.log(err.stack);
                    }
                });
    });

});

// The default task (called when you run `gulp`)
gulp.task('default', ['mocha'], function() {
    // Run dev task by default
});
