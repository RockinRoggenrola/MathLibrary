const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertOperation('*');
    this.currentNestingLvl++;
};

module.exports = new StateSequence('r', 'l', onFunction);