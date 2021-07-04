const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.makeLastNumComplex();
    this.currentNestingLvl--;
};

module.exports = new StateSequence('n', 'r', onFunction);