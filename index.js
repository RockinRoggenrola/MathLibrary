const math = {
    compute: require('./src/Compute/ComputeFunction'),
    ComplexNumber: require('./ComplexNumberClass'),
    Expression: require('./src/Classes/ExpressionClass'),
    FunctionNameInformationMap: require('./src/FunctionNameInformationMap')
};

const expression = '3-4';
console.log(expression);
console.log(math.compute(expression));

module.exports = math;