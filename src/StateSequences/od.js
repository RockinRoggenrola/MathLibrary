const StateSequence = require('../Classes/StateSequenceClass');

let onFunction = function() {
    this.numbers.push(0);
    isDecimal = 1;
};

module.exports = new StateSequence('o', 'd', onFunction);