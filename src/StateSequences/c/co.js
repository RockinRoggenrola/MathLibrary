const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    const operatorSymbol = this.character;
    this.insertOperator(operatorSymbol);
};

module.exports = new StateSequence('c', 'o', onFunction);