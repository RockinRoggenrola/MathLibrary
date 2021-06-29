const StateSequence = require('../Classes/StateSequenceClass');

let onFunction = function(currentExpression) {
    currentExpression.isDecimal = 1;
    return currentExpression;
};

module.exports = new StateSequence('n', 'd', onFunction);