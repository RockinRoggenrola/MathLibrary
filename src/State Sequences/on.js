const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const number = Number(currentExpression.character);
    currentExpression.numbers.push(number);
    currentExpression.isDecimal = 0;
    return currentExpression;
}

module.exports = new StateSequence('o', 'n', onFunction);