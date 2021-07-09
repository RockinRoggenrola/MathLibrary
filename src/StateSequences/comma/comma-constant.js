const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.insertNumber();
};

module.exports = new StateSequence('comma', 'constant', onFunction);