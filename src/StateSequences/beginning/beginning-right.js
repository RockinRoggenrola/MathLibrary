const InvalidExpression = require('../../Classes/InvalidExpressionClass');
const StateSequence = require('../../Classes/StateSequenceClass');
const { RightToLeftGroupingSymbols } = require('../../GroupingSymbols');

const onFunction = function() {
    return new InvalidExpression(`Can't have a closing ${RightToLeftGroupingSymbols.get(this.character).singular} at the beginning of an expression.`, 1);
};

module.exports = new StateSequence('beginning', 'right', onFunction); 