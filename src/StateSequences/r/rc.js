const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertOperator('*');
    this.insertNumber();
};

module.exports = new StateSequence('r', 'c', onFunction);