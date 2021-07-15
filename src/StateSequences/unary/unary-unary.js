const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    if (this.character === this.lastCharacter)
    return new InvalidExpression(`Can't have 2 successive ${this.character} signs.`, this.strIndex);

    return new InvalidExpression(`Can't have a ${this.character} sign after a ${this.lastCharacter} sign.`, this.strIndex);
};

module.exports = new StateSequence('unary', 'unary', onFunction);