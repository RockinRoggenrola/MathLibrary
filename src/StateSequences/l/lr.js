const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');

const onFunction = function() {
    return new InvalidExpression('Can\'t have an empty group of parentheses.', this.strIndex);
};

module.exports = new StateSequence('l', 'r', onFunction);