const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.numbers.push(0);
    this.isDecimal = 1;
};

module.exports = new StateSequence('b', 'd', onFunction);