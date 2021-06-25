const StateSequence = require('../State Sequence Class');
const InvalidExpression = require('../Invalid Expression Class');

let onFunction = function(currentExpression) {
    return new InvalidExpression('Can\'t have an operator right after a decimal point.', currentExpression.strIndex + 1)
};

module.exports = new StateSequence('d', 'o', onFunction);