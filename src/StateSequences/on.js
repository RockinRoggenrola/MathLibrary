const StateSequence = require('../Classes/StateSequenceClass');
const NumberSymbolMap = require('../NumberSymbolMap');

let onFunction = function() {
    const number = NumberSymbolMap.get(this.character);
    this.numbers.push(number);
    this.isDecimal = 0;
};

module.exports = new StateSequence('o', 'n', onFunction);