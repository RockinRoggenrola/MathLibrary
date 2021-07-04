const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');

let onFunction = function() {
    return new InvalidExpression('Can\'t have an operator before a closing parenthesis.', this.strIndex);
};

module.exports = new StateSequence('o', 'r', onFunction);