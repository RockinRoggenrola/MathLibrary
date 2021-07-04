const FunctionNameInformationMap = require("./FunctionNameInformationMap");
const NumberSymbolMap = require("./NumberSymbolMap");
const OperatorFunctionMap = require("./OperatorFunctionMap");
const CharacterTypes = new Map();

OperatorFunctionMap.forEach((value, key) => CharacterTypes.set(key, 'o'));

FunctionNameInformationMap.forEach((value, key) => CharacterTypes.set(key, 'f'));

NumberSymbolMap.forEach((value, key) => {
    if (typeof(value) == 'number') CharacterTypes.set(key, 'n');
    if (typeof(value) == 'object') CharacterTypes.set(key, 'c');
})

CharacterTypes.set('(', 'l');
CharacterTypes.set(')', 'r');

CharacterTypes.set('.', 'd');

let longestCharLen = 0;
for (key of CharacterTypes.keys()) {
    if (key.length > longestCharLen) longestCharLen = key.length;
}

const findCharFromArrayAndIndex = (exprArray, index) => {
    for (let i = longestCharLen; i > 0; i--) {
        const possibleCharacter = exprArray.slice(index, index + i).join("");
        if (CharacterTypes.has(possibleCharacter)) {
            return possibleCharacter;
        }
        if (i == 1) return possibleCharacter;
    }
}

const validEndingTypes = new Set(['n', 'c', 'r']);

module.exports = { CharacterTypes, longestCharLen, validEndingTypes, findCharFromArrayAndIndex };