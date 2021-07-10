const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertOperator('*');
    this.nestingLvl++;
};

module.exports = new StateSequence('right', 'left', onFunction);