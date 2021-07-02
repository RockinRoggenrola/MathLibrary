const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.currentNestingLvl = 1;
};

module.exports = new StateSequence('b', 'l', onFunction);