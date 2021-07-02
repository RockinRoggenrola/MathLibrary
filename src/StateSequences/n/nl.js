const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.insertOperation('*');
    this.currentNestingLvl++;
};

module.exports = new StateSequence('n', 'l', onFunction);