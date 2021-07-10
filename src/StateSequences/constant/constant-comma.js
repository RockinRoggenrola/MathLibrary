const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    if (this.insertFunctionArgument()) return this.insertFunctionArgument();
};

module.exports = new StateSequence('constant', 'comma', onFunction);