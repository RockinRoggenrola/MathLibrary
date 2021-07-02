const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.currentNestingLvl++;
    this.insertOperation('*');
};

module.exports = new StateSequence('c', 'l', onFunction);