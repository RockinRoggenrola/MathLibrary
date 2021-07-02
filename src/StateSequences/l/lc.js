const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertNumber();
    this.isDecimal = 0;
};

module.exports = new StateSequence('l', 'c', onFunction);