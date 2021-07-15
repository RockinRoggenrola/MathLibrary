const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.insertUnaryOperator();
};

module.exports = new StateSequence('constant', 'unary', onFunction);