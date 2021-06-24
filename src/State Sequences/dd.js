const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const InvalidExpression = require('../Invalid Expression Class');
    return new InvalidExpression('Can\'t have 2 successive decimal points.', currentExpression.strIndex);
}

module.exports = new StateSequence('d', 'd', onFunction);