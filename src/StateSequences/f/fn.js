const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() { 
    return new InvalidExpression(`Can't have a number after "${this.lastCharacter}" without parentheses in between them.`, this.srtIndex + 1);
};

module.exports = new StateSequence('f', 'n', onFunction);