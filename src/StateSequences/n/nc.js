const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.makeLastNumComplex();
    this.insertOperator('*');
    this.insertNumber();
    this.isDecimal = 0;
};

module.exports = new StateSequence('n', 'c', onFunction);