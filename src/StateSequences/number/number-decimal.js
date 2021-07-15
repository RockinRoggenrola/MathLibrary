const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');

let onFunction = function() {
    if (this.isDecimal > 1) return new InvalidExpression(`Can't have multiple decimal points in the same number.`, this.strIndex + 1)
    this.isDecimal = 1;
};

module.exports = new StateSequence('number', 'decimal', onFunction);