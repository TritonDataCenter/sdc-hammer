/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*
 * Copyright (c) 2015, Joyent, Inc.
 */

/*
 * See also: https://en.wikipedia.org/wiki/List_of_Star_Trek_characters
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
        'doomed',
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
        'adami',
        'antos',
        'barclay',
        'bashir',
        'betor',
        'brunt',
        'chapel',
        'chekov',
        'cretak',
        'crusher',
        'data',
        'damar',
        'dax',
        'dukat',
        'eddington',
        'edon',
        'evek',
        'fontaine',
        'garak',
        'gomez',
        'gowron',
        'grayson',
        'guinan',
        'homn',
        'hugh',
        'ishka',
        'kehleyr',
        'kirk',
        'kor',
        'kurn',
        'laforge',
        'laren',
        'lefler',
        'leeta',
        'locutus',
        'lore',
        'lursa',
        'maihardu',
        'martok',
        'maxwell',
        'mccoy',
        'mila',
        'morn',
        'mot',
        'nalas',
        'nechayev',
        'nerys',
        'nog',
        'obrien',
        'odo',
        'ogawa',
        'picard',
        'pike',
        'pulaski',
        'q',
        'quark',
        'rand',
        'riker',
        'rom',
        'ross',
        'rozhenko',
        'sarek',
        'saavik',
        'scotty',
        'sela',
        'sisko',
        'sloan',
        'spock',
        'sulan',
        'sulu',
        'tain',
        'tomalak',
        'troi',
        'uhura',
        'vash',
        'weyoun',
        'worf',
        'yar',
        'yates',
        'zek',
        'ziyal'
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
