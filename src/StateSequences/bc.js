const StateSequence = require('../Classes/StateSequenceClass');
const NumberSmymbolMap = require('../NumberSymbolMap');

let onFunction = function() {
    const number = NumberSmymbolMap.get(this.character);
    this.numbers.push(number);
};

module.exports = new StateSequence('b', 'c', onFunction);