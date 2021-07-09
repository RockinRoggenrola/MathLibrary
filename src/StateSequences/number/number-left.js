const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.makeLastNumComplex();
    this.insertOperator('*');
    this.currentNestingLvl++;
};

module.exports = new StateSequence('number', 'left', onFunction);