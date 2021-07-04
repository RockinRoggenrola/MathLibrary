const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.currentNestingLvl--;
};

module.exports = new StateSequence('c', 'r', onFunction);