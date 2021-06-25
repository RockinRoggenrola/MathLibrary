const StateSequence = require('../State Sequence Class');
const InvalidExpression = require('../Invalid Expression Class');

let onFunction = function(currentExpression) {
    return new InvalidExpression(`Can't have a decimal point before ${currentExpression.character}.`, currentExpression.strIndex + 1);
};

module.exports = new StateSequence('d', 'c', onFunction);