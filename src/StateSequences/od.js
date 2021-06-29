const StateSequence = require('../Classes/StateSequenceClass');

let onFunction = function(currentExpression) {
    currentExpression.numbers.push(0);
    isDecimal = 1;
    return currentExpression;
};

module.exports = new StateSequence('o', 'd', onFunction);