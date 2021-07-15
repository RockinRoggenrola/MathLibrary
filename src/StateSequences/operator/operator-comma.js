const InvalidExpression = require("../../Classes/InvalidExpressionClass");
const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have an operator before a comma.`, this.strIndex);
};

module.exports = new StateSequence('operator', 'comma', onFunction);