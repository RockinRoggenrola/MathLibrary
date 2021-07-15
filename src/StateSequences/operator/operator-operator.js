const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');

let onFunction = function() {
    return new InvalidExpression(`Can't have 2 successive operators.`, this.strIndex);
};

module.exports = new StateSequence('operator', 'operator', onFunction);