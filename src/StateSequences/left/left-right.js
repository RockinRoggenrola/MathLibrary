const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');

const onFunction = function() {
    return new InvalidExpression(`Can't have an empty group of grouping symbols.`, this.strIndex);
};

module.exports = new StateSequence('left', 'right', onFunction);