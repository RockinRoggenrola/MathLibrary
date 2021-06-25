const StateSequence = require('../State Sequence Class');
const NumberSymbolMap = require('../Number Symbol Map');

let onFunction = function(currentExpression) {
    if (currentExpression.isDecimal == 0) {
        var number = NumberSymbolMap.get(currentExpression.character);
        currentExpression.numbers[currentExpression.numbersLen() - 1] *= 10;
    } else {
        var number = NumberSymbolMap.get(currentExpression.character) / Math.pow(10, currentExpression.isDecimal);
        currentExpression.isDecimal++;
    }

    currentExpression.numbers[currentExpression.numbersLen() - 1] += number;
    return currentExpression;
};

module.exports = new StateSequence('n', 'n', onFunction);