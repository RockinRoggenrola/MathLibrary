const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.nestingLvl++;
    this.isDecimal = 0;
};

module.exports = new StateSequence('left', 'left', onFunction);