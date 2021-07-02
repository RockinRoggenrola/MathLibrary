const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertOperation('*');
    this.numbers.push(0);
    this.isDecimal = 1;
};

module.export = new StateSequence('r', 'd', onFunction);