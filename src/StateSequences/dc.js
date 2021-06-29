const StateSequence = require('../Classes/StateSequenceClass');
const InvalidExpression = require('../Classes/InvalidExpressionClass');

let onFunction = function(currentExpression) {
    return new InvalidExpression(`Can't have a decimal point before ${currentExpression.character}.`, currentExpression.strIndex + 1);
};

module.exports = new StateSequence('d', 'c', onFunction);