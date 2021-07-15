const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    if (this.closeExpressionGroup()) return this.closeExpressionGroup();
};

module.exports = new StateSequence('unary', 'right', onFunction);