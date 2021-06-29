const ComplexNumber = require('../../ComplexNumberClass');
const StateSequence = require('../Classes/StateSequenceClass');
const NumberSymbolMap = require('../NumberSymbolMap');

let onFunction = function(currentExpression) {
    const number = NumberSymbolMap.get(currentExpression.character);
    currentExpression.numbers.push(number);
    currentExpression.isDecimal = 0;

    if (currentExpression.exprArray.length == currentExpression.strIndex + 1)
    currentExpression.numbers[currentExpression.numbersLen() - 1] = new ComplexNumber(currentExpression.lastNumber(), 0);

    return currentExpression;
};

module.exports = new StateSequence('o', 'n', onFunction);