const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.openExpressionGroup();
};

module.exports = new StateSequence('beginning', 'left', onFunction);