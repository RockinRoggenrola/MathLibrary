const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.insertOperation(this.character);
};

module.exports = new StateSequence('unary', 'operator', onFunction);