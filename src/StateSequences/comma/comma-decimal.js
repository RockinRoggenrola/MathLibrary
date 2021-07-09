const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.numbers.push(0);
};

module.exports = new StateSequence('comma', 'decimal', onFunction);