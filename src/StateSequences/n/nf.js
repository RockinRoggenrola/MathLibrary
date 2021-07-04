const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.makeLastNumComplex();
    this.insertOperator('*');
    this.insertFunction(this.character)
};

module.exports = new StateSequence('n', 'f', onFunction);