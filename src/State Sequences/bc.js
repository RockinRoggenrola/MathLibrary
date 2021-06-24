const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const NumberSmymbolMap = require('../Number Symbol Map');
    const number = NumberSmymbolMap.get(currentExpression.character);

    currentExpression.numbers.push(number);

    return currentExpression;
}

module.exports = new StateSequence('b', 'c', onFunction);