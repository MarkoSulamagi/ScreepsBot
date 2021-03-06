"use strict";

var gulp = require('gulp');
var tsproject = require( 'tsproject' );
var https = require('https');
var fs = require('fs');
var secrets = require('./secrets.js');

gulp.task('compile', function () {
    return tsproject.src( './tsconfig.json')
        .pipe(gulp.dest('./dist'));
});

gulp.task('upload-sim', ['compile'], function () {
    var email = secrets.email,
        password = secrets.password,
        data = {
            branch: 'dev',
            modules: { main: fs.readFileSync('./dist/main.js', { encoding: "utf8" }) }
        };
    var req = https.request({
        hostname: 'screeps.com',
        port: 443,
        path: '/api/user/code',
        method: 'POST',
        auth: email + ':' + password,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }, function(res) {
        console.log("Response: " + res.statusCode);
    });

    req.write(JSON.stringify(data));
    req.end();
});

gulp.task('watch', function() {
    gulp.watch('./src/**/*.ts', ['upload-sim']);
});

gulp.task('default',['watch']);