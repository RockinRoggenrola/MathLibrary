const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const number = Number(currentExpression.character) / 10;
    const numbersLen = currentExpression.numbers.length;
    currentExpression.numbers[numbersLen - 1] += number;
    currentExpression.isDecimal = 2;
    return currentExpression;
}

module.exports = new StateSequence('d', 'n', onFunction);