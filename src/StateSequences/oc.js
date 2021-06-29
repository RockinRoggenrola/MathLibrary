const StateSequence = require('../Classes/StateSequenceClass');
const NumberSymbolMap = require('../NumberSymbolMap');

let onFunction = function(currentExpression) {
    const number = NumberSymbolMap.get(currentExpression.character);    
    currentExpression.numbers.push(number);
    return currentExpression;
};

module.exports = new StateSequence('o', 'c', onFunction);