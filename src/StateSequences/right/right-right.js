const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    if (this.resolveFunction()) return this.resolveFunction();
    this.nestingLvl--;
};

module.exports = new StateSequence('right', 'right', onFunction);