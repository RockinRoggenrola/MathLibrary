const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    this.nestingLvl++;
};

module.exports = new StateSequence('comma', 'left', onFunction);