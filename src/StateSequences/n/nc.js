const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.insertOperation('*');
    this.insertNumber();
    this.isDecimal = 0;
};

module.exports = new StateSequence('n', 'c', onFunction);