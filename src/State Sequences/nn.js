const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const numbersLen = currentExpression.numbers.length;

    if (currentExpression.isDecimal == 0) {
        var number = Number(currentExpression.character);
        currentExpression.numbers[numbersLen - 1] *= 10;
    } else {
        var number = Number(currentExpression.character) / Math.pow(10, currentExpression.isDecimal);
        currentExpression.isDecimal++;
    }

    currentExpression.numbers[numbersLen - 1] += number;
    return currentExpression;
}

module.exports = new StateSequence('n', 'n', onFunction);