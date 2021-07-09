const InvalidExpression = require("../../Classes/InvalidExpressionClass");
const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have a closing parentheses after "${this.lastCharacter}."`, this.strIndex + 1);
};

module.exports = new StateSequence('function', 'right', onFunction);