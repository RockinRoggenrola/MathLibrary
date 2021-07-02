const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');

const onFunction = function() {
    if (this.currentNestingLvl == 0) return new InvalidExpression('Can\'t close a parenthesis group when you haven\'t opened it.', this.strIndex + 1);
    this.currentNestingLvl--;
};

module.exports = new StateSequence('c', 'r', onFunction);