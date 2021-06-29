const StateSequence = require('../Classes/StateSequenceClass');
const NumberSmymbolMap = require('../NumberSymbolMap');

let onFunction = function(currentExpression) {
    const number = NumberSmymbolMap.get(currentExpression.character);
    currentExpression.numbers.push(number);
    return currentExpression;
};

module.exports = new StateSequence('b', 'n', onFunction);