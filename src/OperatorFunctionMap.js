const ComplexNumber = require('../ComplexNumberClass');
const OperatorFunctionMap = new Map();

OperatorFunctionMap.set('+', array => array.reduce((total, value) => ComplexNumber.add(total, value)));
OperatorFunctionMap.set('-', array => array.reduce((total, value) => ComplexNumber.subtract(total, value)));
OperatorFunctionMap.set('*', array => array.reduce((total, value) => ComplexNumber.multiply(total, value)));
OperatorFunctionMap.set('/', array => array.reduce((total, value) => ComplexNumber.divide(total, value)));

OperatorFunctionMap.set('^', array => array.reduceRight((total, value) => ComplexNumber.exponentiate(value, total)));

module.exports = OperatorFunctionMap;