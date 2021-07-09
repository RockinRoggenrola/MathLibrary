const StateSequence = require('../../Classes/StateSequenceClass');

const onFunction = function() {
    this.insertOperator('*');
    this.numbers.push(0);
    this.isDecimal = 1;
};

module.export = new StateSequence('right', 'decimal', onFunction);