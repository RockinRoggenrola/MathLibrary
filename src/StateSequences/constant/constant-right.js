const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.resolveFunction();
    this.currentNestingLvl--;
};

module.exports = new StateSequence('constant', 'right', onFunction);