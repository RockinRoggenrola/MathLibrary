const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    if (this.resolveFunction()) return this.resolveFunction();
    if (this.closeExpressionGroup()) return this.closeExpressionGroup();
};

module.exports = new StateSequence('constant', 'right', onFunction);