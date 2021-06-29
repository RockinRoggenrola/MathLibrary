const StateSequence = require('../Classes/StateSequenceClass');
const InvalidExpression = require('../Classes/InvalidExpressionClass');

let onFunction = function() {
    return new InvalidExpression(`Can't have a decimal point after ${this.lastCharacter}.`, this.strIndex + 1);
};

module.exports = new StateSequence('c', 'd', onFunction);