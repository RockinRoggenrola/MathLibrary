const StateSequence = require('../State Sequence Class');
const NumberSymbolMap = require('../Number Symbol Map');

let onFunction = function(currentExpression) {
    const number = NumberSymbolMap.get(currentExpression.character) / 10;

    currentExpression.numbers[currentExpression.numbersLen() - 1] += number;
    currentExpression.isDecimal = 2;
    
    return currentExpression;
};

module.exports = new StateSequence('d', 'n', onFunction);