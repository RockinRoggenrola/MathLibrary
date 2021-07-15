const InvalidExpression = require("../../Classes/InvalidExpressionClass");
const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have a decimal point before a comma.`, this.strIndex);
};

module.exports = new StateSequence('decimal', 'comma', onFunction);