let math = {
    compute: require('./src/Parser').compute,
    ComplexNumber: require('./ComplexNumberClass'),
    Expression: require('./src/Classes/ExpressionClass'),
    FunctionNameInformationMap: require('./src/FunctionNameInformationMap')
};

console.log(math.compute('4+5'));

module.exports = math;