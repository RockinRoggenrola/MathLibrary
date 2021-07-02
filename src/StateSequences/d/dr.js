const InvalidExpression = require('../../Classes/InvalidExpressionClass');
const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    return new InvalidExpression('Can\'t have a decimal point right before a closing parenthesis.', this.strIndex + 1);
};

module.exports = new StateSequence('d', 'r', onFunction);