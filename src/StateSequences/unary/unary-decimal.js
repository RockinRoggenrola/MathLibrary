const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have a decimal point after a ${this.character} sign.`, this.strIndex + 1);
};

module.exports = new StateSequence('unary', 'decimal', onFunction);