const fs = require('fs');
const process = require('process');

process.chdir(__dirname);
const stateSequenceFiles = fs.readdirSync('./StateSequences').filter(file => file.endsWith('.js'));
const stateSequenceMap = new Map();

stateSequenceFiles.forEach(value => {
    const file = require(`./StateSequences/${value}`);
    stateSequenceMap.set(file.stateSequenceAsStr, file);
})

module.exports = stateSequenceMap;