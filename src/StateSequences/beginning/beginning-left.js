const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.currentNestingLvl = 1;
};

module.exports = new StateSequence('beginning', 'left', onFunction);