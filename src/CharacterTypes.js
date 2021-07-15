const FunctionNameInformationMap = require("./FunctionNameInformationMap");
const NumberSymbolMap = require("./NumberSymbolMap");
const CharacterTypes = new Map();
const { GroupingSymbolMap } = require("./GroupingSymbols");
const { OperatorFunctionMap, UnaryOperatorFunctionMap } = require("./OperatorFunctionMap");

OperatorFunctionMap.forEach((value, key) => CharacterTypes.set(key, 'operator'));

UnaryOperatorFunctionMap.forEach((value, key) => CharacterTypes.set(key, 'unary'));

FunctionNameInformationMap.forEach((value, key) => CharacterTypes.set(key, 'function'));

NumberSymbolMap.forEach((value, key) => {
    if (typeof(value) === 'number') CharacterTypes.set(key, 'number');
    if (typeof(value) === 'object') CharacterTypes.set(key, 'constant');
})

GroupingSymbolMap.forEach(value => {
    CharacterTypes.set(value.left, 'left');
    CharacterTypes.set(value.right, 'right');
})

CharacterTypes.set('.', 'decimal');
CharacterTypes.set(',', 'comma');

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
    if (i === 1) return possibleCharacter;
    }
}

const validEndingTypes = new Set(['number', 'constant', 'unary', 'right']);

module.exports = { CharacterTypes, longestCharLen, validEndingTypes, findCharFromArrayAndIndex };