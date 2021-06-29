const StateSequence = require('../Classes/StateSequenceClass');
const NumberSymbolMap = require('../NumberSymbolMap');

let onFunction = function() {
    const number = NumberSymbolMap.get(this.character);    
    this.numbers.push(number);
};

module.exports = new StateSequence('o', 'c', onFunction);