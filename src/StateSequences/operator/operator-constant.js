const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.insertNumber();
};

module.exports = new StateSequence('operator', 'constant', onFunction);