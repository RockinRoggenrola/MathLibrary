const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const NumberSymbolMap = require('../Number Symbol Map');
    const number = NumberSymbolMap.get(currentExpression.character);
    
    currentExpression.numbers.push(number);

    return currentExpression;
}

module.exports = new StateSequence('o', 'c', onFunction);