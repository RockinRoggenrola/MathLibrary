const StateSequence = require('../State Sequence Class');
const NumberSymbolMap = require('../Number Symbol Map');

let onFunction = function(currentExpression) {
    const number = NumberSymbolMap.get(currentExpression.character);
    currentExpression.numbers.push(number);
    currentExpression.isDecimal = 0;
    return currentExpression;
};

module.exports = new StateSequence('o', 'n', onFunction);