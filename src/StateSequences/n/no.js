const StateSequence = require('../../Classes/StateSequenceClass');

let onFunction = function() {
    this.insertOperation(this.character);
    this.isDecimal = 0;
};

module.exports = new StateSequence('n', 'o', onFunction);