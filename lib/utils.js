/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2015, Joyent, Inc.
 */

function isUUID(str)
{
    var re = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/;
    if (str && str.length === 36 && str.match(re)) {
        return true;
    } else {
        return false;
    }
}

function ltrim(str, chars)
{
    chars = chars || '\\s';
    str = str || '';
    return str.replace(new RegExp('^[' + chars + ']+', 'g'), '');
}

function rtrim(str, chars)
{
    chars = chars || '\\s';
    str = str || '';
    return str.replace(new RegExp('[' + chars + ']+$', 'g'), '');
}

function trim(str, chars)
{
    return ltrim(rtrim(str, chars), chars);
}

module.exports = {
    isUUID: isUUID,
    ltrim: ltrim,
    rtrim: rtrim,
    trim: trim
};
