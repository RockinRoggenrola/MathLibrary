const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertOperator('*');
    this.currentNestingLvl++;
};

module.exports = new StateSequence('right', 'left', onFunction);