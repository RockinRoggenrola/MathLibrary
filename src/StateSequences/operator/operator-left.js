const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.nestingLvl++;
};

module.exports = new StateSequence('operator', 'left', onFunction);