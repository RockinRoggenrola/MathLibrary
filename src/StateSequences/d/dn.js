const StateSequence = require('../../Classes/StateSequenceClass');
const NumberSymbolMap = require('../../NumberSymbolMap');

const onFunction = function() {
    const number = NumberSymbolMap.get(this.character) / 10;
    this.numbers[this.numbersLen - 1] += number;
    this.isDecimal = 2;
};

module.exports = new StateSequence('d', 'n', onFunction);