const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.isnertOperator('*');
    this.insertNumber();
};

module.exports = new StateSequence('constant', 'number', onFunction);