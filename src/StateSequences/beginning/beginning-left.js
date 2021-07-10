const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.nestingLvl = 1;
};

module.exports = new StateSequence('beginning', 'left', onFunction);