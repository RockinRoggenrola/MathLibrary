const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.insertFunction(this.character);
    this.insertFunctionArgument();
};

module.exports = new StateSequence('beginning', 'function', onFunction);