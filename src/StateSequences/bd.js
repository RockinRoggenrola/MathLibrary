const StateSequence = require('../Classes/StateSequenceClass');

let onFunction = function(currentExpression) {
    currentExpression.numbers.push(0);
    currentExpression.isDecimal = 1;
    return currentExpression;
};

module.exports = new StateSequence('b', 'd', onFunction);