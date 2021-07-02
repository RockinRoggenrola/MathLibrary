const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.currentNestingLvl++;
};

module.exports = new StateSequence('o', 'l', onFunction);