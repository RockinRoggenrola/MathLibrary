const StateSequence = require('../Classes/StateSequenceClass');
const InvalidExpression = require('../Classes/InvalidExpressionClass');

let onFunction = function(currentExpression) {
    return new InvalidExpression('Can\'t have an operator right after a decimal point.', currentExpression.strIndex + 1)
};

module.exports = new StateSequence('d', 'o', onFunction);