const InvalidExpression = require('../../Classes/InvalidExpressionClass');
const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    return new InvalidExpression('Can\'t have a right parenthesis at the beginning of an expression.', 0);
};

module.exports = new StateSequence('beginning', 'right', onFunction); 