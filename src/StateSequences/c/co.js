const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    const operatorSymbol = this.character;
    this.insertOperation(operatorSymbol);
};

module.exports = new StateSequence('c', 'o', onFunction);