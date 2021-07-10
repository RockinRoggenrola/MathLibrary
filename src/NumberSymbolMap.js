const ComplexNumber = require('../ComplexNumberClass');
const NumberSymbolMap = new Map();

NumberSymbolMap.set('0', 0);
NumberSymbolMap.set('1', 1);
NumberSymbolMap.set('2', 2);
NumberSymbolMap.set('3', 3);
NumberSymbolMap.set('4', 4);
NumberSymbolMap.set('5', 5);
NumberSymbolMap.set('6', 6);
NumberSymbolMap.set('7', 7);
NumberSymbolMap.set('8', 8);
NumberSymbolMap.set('9', 9);

NumberSymbolMap.set('pi', new ComplexNumber(Math.PI, 0));
NumberSymbolMap.set('π', new ComplexNumber(Math.PI, 0));
NumberSymbolMap.set('tau', new ComplexNumber(2*Math.PI, 0));
NumberSymbolMap.set('τ', new ComplexNumber(2*Math.PI, 0));
NumberSymbolMap.set('e', new ComplexNumber(Math.E, 0));
NumberSymbolMap.set('°', new ComplexNumber(Math.PI / 180, 0));
NumberSymbolMap.set('deg', new ComplexNumber(Math.PI / 180, 0));
NumberSymbolMap.set('i', new ComplexNumber(0, 1));

module.exports = NumberSymbolMap;