const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    currentExpression.isDecimal = 1;
    return currentExpression;
};

module.exports = new StateSequence('n', 'd', onFunction);