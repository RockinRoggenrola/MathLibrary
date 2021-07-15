const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have a ${this.character} sign after a comma.`, this.strIndex + 1);
};

module.exports = new StateSequence('comma', 'unary', onFunction);