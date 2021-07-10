const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    if (this.insertFunctionArgument()) return this.insertFunctionArgument();
    this.makeLastNumComplex();
    this.isDecimal = 0;
};

module.exports = new StateSequence('number', 'comma', onFunction);