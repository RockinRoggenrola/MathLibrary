const StateSequence = require('../State Sequence Class');
const InvalidExpression = require('../Invalid Expression Class');

let onFunction = function(currentExpression) {
    return new InvalidExpression('Can\'t have 2 successive decimal points.', currentExpression.strIndex);
}

module.exports = new StateSequence('d', 'd', onFunction);