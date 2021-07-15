const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.insertOperator('*');
    this.insertFunction(this.character);
};

module.exports = new StateSequence('unary', 'function', onFunction);