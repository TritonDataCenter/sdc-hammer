/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var child_process = require('child_process');
var exec = child_process.exec;
var execFile = child_process.execFile;
var generateContainerName = require('./names').generateContainerName;
var utils = require('./utils');

var RECENT_COUNT = 100; // we'll keep track of this many recent names
var recently_used_names = [];

function findDocker()
{
    if (process.env.DOCKER_CMD) {
        return (process.env.DOCKER_CMD);
    }

    return ('docker');
}

function dockerIdToUuid(dockerId) {
    var out;

    out = dockerId.substr(0, 8) + '-'
        + dockerId.substr(8, 4) + '-'
        + dockerId.substr(12, 4) + '-'
        + dockerId.substr(16, 4) + '-'
        + dockerId.substr(20, 12);

    return (out);
}

function makeName()
{
    var proposed;

    proposed = generateContainerName()
    while (recently_used_names.indexOf(proposed) !== -1) {
        proposed = generateContainerName()
    }

    recently_used_names.push(proposed);
    while (recently_used_names.length > RECENT_COUNT) {
        recently_used_names.shift();
    }

    return (proposed);
}

function uuidToShort(uuid) {
    return uuid.replace(/-/g, '').slice(0, 12);
}

function dockerDestroy(dockerId, callback) {
    var opts = {env: process.env};

    exec(findDocker() + ' rm -f ' + dockerId,
        opts,
        function (err, stdout, stderr) {

            var lines;
            var new_err;

            if (err) {
                err.stdout = stdout;
                err.stderr = stderr;
                callback(err);
                return;
            }

            lines = utils.trim(stdout).split('\n');

            if (lines.length !== 1) {
                new_err = new Error('more lines than expected: ' + lines.length);
                new_err.stdout = stdout;
                new_err.stderr = stderr;
                callback(new_err);
                return;
            }

            if (lines[0] !== dockerId) {
                new_err = new Error('expected dockerId got: ' + lines[0]);
                new_err.stdout = stdout;
                new_err.stderr = stderr;
                callback(new_err);
                return;
            }

            callback();
        }
    );
}

function runAndDestroy(callback) {
    run(function (err, result) {
        if (err === null) {
            dockerDestroy(uuidToShort(result.uuid), function (e) {
                if (e) {
                    callback(e, result);
                    return;
                }
                callback(null, result);
                return;
            });
        } else {
            callback(err, result);
        }
    });
}

function run(callback) {
    var cmdline = '';
    var name = makeName();
    var opts = {env: process.env};

    // use docker from path
    cmdline = findDocker() + ' run -m 128M --name="' + name
        + '" -d busybox sleep 60';

    //console.log(cmdline);
    exec(cmdline, opts, function (err, stdout, stderr) {
        var lines;
        var new_err;
        var result = {};

        result.name = name;

        if (err) {
            err.stdout = stdout;
            err.stderr = stderr;
            callback(err, result);
            return;
        }

        lines = utils.trim(stdout).split('\n');

        if (lines.length !== 1) {
            new_err = new Error('more lines than expected: ' + lines.length);
            new_err.stdout = stdout;
            new_err.stderr = stderr;
            callback(new_err, result);
            return;
        }

        if (lines[0].length === 64) {
            result.uuid = dockerIdToUuid(lines[0]);
        } else {
            result.uuid = lines[0];
        }

        if (utils.isUUID(result.uuid)) {
            callback(null, result);
            return;
        } else {
            new_err = new Error('result is not a UUID');
            new_err.stdout = stdout;
            new_err.stderr = stderr;
            callback(new_err, result);
        }
    });
}

module.exports = {
    run: run,
    runAndDestroy: runAndDestroy
};
