const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have an operator after "${this.lastCharacter}" without parentheses in between.`, this.strIndex + 1);
};

module.exports = new StateSequence('function', 'operator', onFunction);