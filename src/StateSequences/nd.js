const StateSequence = require('../Classes/StateSequenceClass');

let onFunction = function() {
    this.isDecimal = 1;
};

module.exports = new StateSequence('n', 'd', onFunction);