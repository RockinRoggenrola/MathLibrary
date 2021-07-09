const StateSequence = require("../../Classes/StateSequenceClass");

const onFunction = function() {
    const operatorSymbol = this.character;

    if (operatorSymbol !== '+' && operatorSymbol !== '-') return //to next line ->
    new InvalidExpression(`Can't have a ${operatorSymbol} after a comma.`, this.strIndex + 1);
    if (operatorSymbol === '+') return;
    
    this.numbers.push(new ComplexNumber(-1, 0));
    this.insertOperator('*');
};

module.exports = new StateSequence('comma', 'operator', onFunction);