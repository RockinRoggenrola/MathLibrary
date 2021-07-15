const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.openExpressionGroup();
};

module.exports = new StateSequence('operator', 'left', onFunction);