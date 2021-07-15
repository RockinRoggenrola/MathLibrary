const InvalidExpression = require('../../Classes/InvalidExpressionClass');
const StateSequence = require('../../Classes/StateSequenceClass');
const { RightToLeftGroupingSymbols } = require('../../GroupingSymbols');

const onFunction = function() {
    return new InvalidExpression(`Can't have a decimal point before a closing ${RightToLeftGroupingSymbols.get(this.character).singular}.`, this.strIndex);
};

module.exports = new StateSequence('decimal', 'right', onFunction);