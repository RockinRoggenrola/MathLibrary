const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertOperator(this.character);
};

module.exports = new StateSequence('right', 'operator', onFunction);