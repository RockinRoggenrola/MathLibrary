const InvalidExpression = require("../../Classes/InvalidExpressionClass");
const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    return new InvalidExpression('Can\'t have an operator followed by a comma.', this.strIndex + 1);
};

module.exports = new StateSequence('operator', 'comma', onFunction);