const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');

const onFunction = function() {
    return new InvalidExpression(`Can't have a decimal point right before a function.`, this.strIndex);
};

module.exports = new StateSequence('decimal', 'function', onFunction);