const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have a ${this.character} sign after an operator.`, this.strIndex + 1);
};

module.exports = new StateSequence('operator', 'unary', onFunction);