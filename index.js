const math = {
    compute: require('./src/Compute/ComputeFunction'),
    ComplexNumber: require('./ComplexNumberClass'),
    Expression: require('./src/Classes/ExpressionClass'),
    Polynomial: require('./src/SolvingEquations/PolynomialClass'),
    FunctionNameInformationMap: require('./src/FunctionNameInformationMap')
};

const polynomial = new math.Polynomial([1,0,0,1]);
console.log(polynomial.factoredExpressionString());

module.exports = math;