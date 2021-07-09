const StateSequence = require("../../Classes/StateSequenceClass"); 
const InvalidExpression = require("../../Classes/InvalidExpressionClass");

const onFunction = function() {
    return new InvalidExpression('Can\'t have a comma without a value before it.', this.strIndex + 1);
};

module.exports = new StateSequence('left', 'comma', onFunction);