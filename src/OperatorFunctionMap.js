const ComplexNumber = require('../ComplexNumberClass');
const OperatorFunctionMap = new Map();

OperatorFunctionMap.set('+', ComplexNumber.add);
OperatorFunctionMap.set('-', ComplexNumber.subtract);
OperatorFunctionMap.set('*', ComplexNumber.multiply);
OperatorFunctionMap.set('/', ComplexNumber.divide);
OperatorFunctionMap.set('÷', ComplexNumber.divide);
OperatorFunctionMap.set('^', ComplexNumber.exponentiate);
OperatorFunctionMap.set('**', ComplexNumber.exponentiate);

module.exports = OperatorFunctionMap;