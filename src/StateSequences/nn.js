const StateSequence = require('../Classes/StateSequenceClass');
const NumberSymbolMap = require('../NumberSymbolMap');
const ComplexNumber = require('../../ComplexNumberClass');

let onFunction = function(currentExpression) { 
    if (currentExpression.isDecimal == 0) {
        var number = NumberSymbolMap.get(currentExpression.character);
        currentExpression.numbers[currentExpression.numbersLen() - 1] *= 10;
    } else {
        var number = NumberSymbolMap.get(currentExpression.character) / Math.pow(10, currentExpression.isDecimal);
        currentExpression.isDecimal++;
    }

    currentExpression.numbers[currentExpression.numbersLen() - 1] += number;

    if (currentExpression.exprArray.length == currentExpression.strIndex + 1)
    currentExpression.numbers[currentExpression.numbersLen() - 1] = new ComplexNumber(currentExpression.lastNumber(), 0);

    return currentExpression;
};

module.exports = new StateSequence('n', 'n', onFunction);