const ComplexNumber = require('../ComplexNumberClass');
const OperatorFunctionMap = new Map();

OperatorFunctionMap.set('+', ComplexNumber.add);
OperatorFunctionMap.set('-', ComplexNumber.subtract);
OperatorFunctionMap.set('*', ComplexNumber.multiply);
OperatorFunctionMap.set('/', ComplexNumber.divide);
OperatorFunctionMap.set('÷', ComplexNumber.divide);
OperatorFunctionMap.set('^', ComplexNumber.exponentiate);
OperatorFunctionMap.set('**', ComplexNumber.exponentiate);

const UnaryOperatorFunctionMap = new Map();

UnaryOperatorFunctionMap.set('%', array => ComplexNumber.divide([
    array[0],
    new ComplexNumber(100, 0)]
));

module.exports = { OperatorFunctionMap, UnaryOperatorFunctionMap };