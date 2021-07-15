const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertOperator('*');
    this.openExpressionGroup();
};

module.exports = new StateSequence('constant', 'left', onFunction);