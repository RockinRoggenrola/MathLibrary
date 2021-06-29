const StateSequence = require('../Classes/StateSequenceClass');
const Operation = require('../Classes/OperationClass');
const NumberSmymbolMap = require('../NumberSymbolMap');

let onFunction = function() {
    const operation = new Operation('*', this.numbersLen - 1, 2);
    const number = NumberSmymbolMap.get(this.character);

    this.multDiv.push(operation);
    this.numbers.push(number);
};

module.exports = new StateSequence('c', 'n', onFunction);