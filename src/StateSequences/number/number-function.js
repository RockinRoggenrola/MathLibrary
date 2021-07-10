const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.makeLastNumComplex();
    this.insertOperator('*');
    this.insertFunction(this.character);
    this.isDecimal = 0;
};

module.exports = new StateSequence('number', 'function', onFunction);