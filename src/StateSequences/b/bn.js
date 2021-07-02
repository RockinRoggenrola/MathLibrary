const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertNumber();
};

module.exports = new StateSequence('b', 'n', onFunction);