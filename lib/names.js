/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2015, Joyent, Inc.
 */

function generateContainerName()
{
    var left = [
        'annoyed',
        'bored',
        'bothered',
        'depressed',
        'despondent',
        'discontented',
        'dissatisfied',
        'exhausted',
        'fatigued',
        'glum',
        'irked',
        'jaded',
        'melancholy',
        'miffed',
        'miserable',
        'morose',
        'pooped',
        'sleepy',
        'surly',
        'tired',
        'unexcited',
        'weary'
    ];
    var invalid = [];
    var right = [
        'bashir',
        'chekov',
        'crusher',
        'data',
        'dax',
        'dukat',
        'garak',
        'kirk',
        'laforge',
        'locutus',
        'maxwell',
        'mccoy',
        'obrien',
        'odo',
        'picard',
        'q',
        'quark',
        'riker',
        'sarek',
        'scotty',
        'sisko',
        'spock',
        'sulu',
        'troi',
        'uhura',
        'worf',
        'yar',
    ];
    var name;

    while (!name || (invalid.indexOf(name) !== -1)) {
        name = left[Math.floor(Math.random() * left.length)]
            + '_' + right[Math.floor(Math.random() * right.length)];
    }

    return (name);
}

module.exports = {
    generateContainerName: generateContainerName
};
