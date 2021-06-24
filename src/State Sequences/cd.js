const StateSequence = require('../State Sequence Class');

let onFunction = function(currentExpression) {
    const InvalidExpression = require('../Invalid Expression Class');

    return new InvalidExpression(`Can't have a decimal point after ${currentExpression.lastCharacter}.`, currentExpression.strIndex + 1);
}

module.exports = new StateSequence('c', 'd', onFunction);