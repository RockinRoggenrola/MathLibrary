const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');
const { RightToLeftGroupingSymbols } = require('../../GroupingSymbols');

let onFunction = function() {
    return new InvalidExpression(`Can't have an operator before a closing ${RightToLeftGroupingSymbols.get(this.character).singular}.`, this.strIndex);
};

module.exports = new StateSequence('operator', 'right', onFunction);