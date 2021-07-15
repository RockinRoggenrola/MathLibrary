const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.makeLastNumComplex();
    this.insertUnaryOperator();
    this.isDecimal = 0;
};

module.exports = new StateSequence('number', 'unary', onFunction);