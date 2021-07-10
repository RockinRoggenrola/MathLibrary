const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    if (this.resolveFunction()) return this.resolveFunction();
    this.makeLastNumComplex();
    this.nestingLvl--;
    this.isDecimal = 0;
};

module.exports = new StateSequence('number', 'right', onFunction);