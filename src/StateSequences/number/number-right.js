const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    if (this.resolveFunction()) return this.resolveFunction();
    if (this.closeExpressionGroup()) return this.closeExpressionGroup();
    this.makeLastNumComplex();
    this.isDecimal = 0;
};

module.exports = new StateSequence('number', 'right', onFunction);