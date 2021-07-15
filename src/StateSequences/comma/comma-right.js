const InvalidExpression = require("../../Classes/InvalidExpressionClass");
const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    return new InvalidExpression(`Can't have a comma without a value after it.`, this.strIndex);
};

module.exports = new StateSequence('comma', 'right', onFunction);