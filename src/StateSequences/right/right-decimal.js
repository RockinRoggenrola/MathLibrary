const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');
const { RightToLeftGroupingSymbols } = require('../../GroupingSymbols');

const onFunction = function() {
    return new InvalidExpression(`Can't have a decimal point after a ${RightToLeftGroupingSymbols.get(this.lastCharacter).singular}.`, this.strIndex + 1)
};

module.exports = new StateSequence('right', 'decimal', onFunction);