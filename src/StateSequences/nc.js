const StateSequence = require('../Classes/StateSequenceClass');
const Operation = require('../Classes/OperationClass');
const NumberSymbolMap = require('../NumberSymbolMap');

let onFunction = function() {
    this.makeLastNumComplex();

    const operation = new Operation('*', this.numbersLen - 1, 2);
    const number = NumberSymbolMap.get(this.character);

    this.numbers.push(number);
    this.multDiv.push(operation);
    this.isDecimal = 0;
};

module.exports = new StateSequence('n', 'c', onFunction);