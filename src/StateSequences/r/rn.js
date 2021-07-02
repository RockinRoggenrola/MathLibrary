const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertOperation('*');
    this.insertNumber();
};

module.exports = new StateSequence('r', 'n', onFunction);