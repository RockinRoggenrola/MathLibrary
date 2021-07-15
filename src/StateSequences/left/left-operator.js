const StateSequence = require('../../Classes/StateSequenceClass');
const InvalidExpression = require('../../Classes/InvalidExpressionClass');
const ComplexNumber = require('../../../ComplexNumberClass');
const { GroupingSymbolMap } = require('../../GroupingSymbols');

const onFunction = function() {
    const operatorSymbol = this.character;

    if (operatorSymbol !== '+' && operatorSymbol !== '-')
    return new InvalidExpression(`Can't have an operator after an opening ${GroupingSymbolMap.get(this.lastCharacter).singular}.`, this.strIndex + 1);
    if (operatorSymbol === '+') return;
    
    this.numbers.push(new ComplexNumber(-1, 0));
    this.insertOperator('*');
};

module.exports = new StateSequence('left', 'operator', onFunction);