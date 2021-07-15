const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have a decimal point before a ${this.character} sign.`, this.strIndex);
};

module.exports = new StateSequence('decimal', 'unary', onFunction);