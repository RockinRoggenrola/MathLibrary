const StateSequence = require('../../Classes/StateSequenceClass');
const NumberSymbolMap = require('../../NumberSymbolMap');

let onFunction = function() { 
    if (this.isDecimal === 0) {
        var number = NumberSymbolMap.get(this.character);
        this.numbers[this.numbersLen - 1] *= 10;
    } else {
        var number = NumberSymbolMap.get(this.character) / Math.pow(10, this.isDecimal);
        this.isDecimal++;
    }

    this.numbers[this.numbersLen - 1] += number;
};

module.exports = new StateSequence('number', 'number', onFunction);