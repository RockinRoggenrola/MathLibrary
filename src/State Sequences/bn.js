const StateSequence = require('../State Sequence Class');
const NumberSmymbolMap = require('../Number Symbol Map');

let onFunction = function(currentExpression) {
    const number = NumberSmymbolMap.get(currentExpression.character);
    currentExpression.numbers.push(number);
    return currentExpression;
};

module.exports = new StateSequence('b', 'n', onFunction);