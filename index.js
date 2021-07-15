let math = {
    compute: require('./src/Parser').compute,
    ComplexNumber: require('./ComplexNumberClass'),
    Expression: require('./src/Classes/ExpressionClass'),
    FunctionNameInformationMap: require('./src/FunctionNameInformationMap')
};

const expression = ')9-8';
console.log(expression);
console.log(math.compute(expression));

module.exports = math;