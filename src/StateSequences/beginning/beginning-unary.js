const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have a ${this.character} sign at the beginning of an expression.`, 1);
};

module.exports = new StateSequence('beginning', 'unary', onFunction);