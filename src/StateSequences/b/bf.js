const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.insertFunction(this.character);
};

module.exports = new StateSequence('b', 'f', onFunction);