const InvalidExpression = require("../../Classes/InvalidExpressionClass");
const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have a comma after "${this.lastCharacter}" without parentheses in between.`, this.strIndex + 1);
};

module.exports = new StateSequence('function', 'comma', onFunction);