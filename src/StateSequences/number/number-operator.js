const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.makeLastNumComplex();
    this.insertOperator(this.character);
    this.isDecimal = 0;
};

module.exports = new StateSequence('number', 'operator', onFunction);