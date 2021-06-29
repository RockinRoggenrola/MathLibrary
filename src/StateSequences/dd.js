const StateSequence = require('../Classes/StateSequenceClass');
const InvalidExpression = require('../Classes/InvalidExpressionClass');

let onFunction = function(currentExpression) {
    return new InvalidExpression('Can\'t have 2 successive decimal points.', currentExpression.strIndex);
}

module.exports = new StateSequence('d', 'd', onFunction);