const StateSequence = require("../../Classes/StateSequenceClass");
const InvalidExpression = require("../../Classes/InvalidExpressionClass");
const { GroupingSymbolMap } = require("../../GroupingSymbols");

const onFunction = function() {
    return new InvalidExpression(`Can't have a ${this.character} sign after an opening ${GroupingSymbolMap.get(this.lastCharacter).singular}.`, this.strIndex + 1);
};

module.exports = new StateSequence('left', 'unary', onFunction);