const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    return new InvalidExpression('Can\'t have 2 consecutive functions without parentheses separating them.', this.strIndex + 1);
};

module.exports = new StateSequence('f', 'f', onFunction);