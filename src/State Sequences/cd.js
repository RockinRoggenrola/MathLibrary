const StateSequence = require('../State Sequence Class');
const InvalidExpression = require('../Invalid Expression Class');

let onFunction = function(currentExpression) {
    return new InvalidExpression(`Can't have a decimal point after ${currentExpression.lastCharacter}.`, currentExpression.strIndex + 1);
};

module.exports = new StateSequence('c', 'd', onFunction);