const NumberSymbolMap = require("./NumberSymbolMap");
const OperatorFunctionMap = require("./OperatorFunctionMap");
const CharacterTypes = new Map();

OperatorFunctionMap.forEach((value, key) => CharacterTypes.set(key, 'o'));

NumberSymbolMap.forEach((value, key) => {
    if (typeof(value) == 'number') CharacterTypes.set(key, 'n');
    if (typeof(value) == 'object') CharacterTypes.set(key, 'c');
})

CharacterTypes.set('(', 'l');
CharacterTypes.set(')', 'r');

CharacterTypes.set('.', 'd');

let longestCharLen = 0;
const keyIterator = CharacterTypes.keys();
for (key of keyIterator) {
    if (key.length > longestCharLen) longestCharLen = key.length;
}

const validEndingTypes = new Set(['n', 'c', 'r']);

module.exports = { CharacterTypes, longestCharLen, validEndingTypes };