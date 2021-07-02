const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');

const onFunction = function() {
    return new InvalidExpression('Can\'t have 2 successive decimal points.', this.strIndex);
}

module.exports = new StateSequence('d', 'd', onFunction);