const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have ${this.character} after "${this.lastCharacter}" with no parentheses in between.`, this.strIndex + 1);
};

module.exports = new StateSequence('f', 'c', onFunction);