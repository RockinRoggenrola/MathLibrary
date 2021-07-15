const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');
const { GroupingSymbolMap } = require('../../GroupingSymbols');

const onFunction = function() {
    return new InvalidExpression(`Can't have a decimal point before an opening ${GroupingSymbolMap.get(this.character).singular}.`, this.strIndex);
};

module.exports = new StateSequence('decimal', 'left', onFunction);