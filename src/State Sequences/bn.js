const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const number = Number(currentExpression.character);
    currentExpression.numbers.push(number);
    return currentExpression;
}

module.exports = new StateSequence('b', 'n', onFunction);