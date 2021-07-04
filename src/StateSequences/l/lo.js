const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');
const ComplexNumber = require('../../../ComplexNumberClass');

const onFunction = function() {
    const operatorSymbol = this.character;

    if (operatorSymbol != '+' && operatorSymbol != '-') // to next line -> 
    return new InvalidExpression(`Can't have a ${operatorSymbol} after an opening parenthesis.`, this.strIndex + 1);
    if (operatorSymbol == '+') return;
    
    this.numbers.push(new ComplexNumber(-1, 0));
    this.insertOperator('*');
};

module.exports = new StateSequence('l', 'o', onFunction);