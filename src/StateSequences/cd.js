const StateSequence = require('../Classes/StateSequenceClass');
const InvalidExpression = require('../Classes/InvalidExpressionClass');

let onFunction = function(currentExpression) {
    return new InvalidExpression(`Can't have a decimal point after ${currentExpression.lastCharacter}.`, currentExpression.strIndex + 1);
};

module.exports = new StateSequence('c', 'd', onFunction);