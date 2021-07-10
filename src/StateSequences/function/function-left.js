const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.nestingLvl++;
    this.insertFunctionArgument();
};

module.exports = new StateSequence('function', 'left', onFunction);