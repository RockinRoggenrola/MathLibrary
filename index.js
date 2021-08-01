const math = {
    compute: require('./src/Compute/ComputeFunction'),
    ComplexNumber: require('./ComplexNumberClass'),
    Expression: require('./src/Classes/ExpressionClass'),
    Polynomial: require('./src/SolvingEquations/PolynomialClass'),
    RationalFunction: require('./src/SolvingEquations/RationalFunctionClass'),
    FunctionNameInformationMap: require('./src/FunctionNameInformationMap')
};

const polynomial = new math.Polynomial([1,0,2,0,1]);

console.log(polynomial.toString());
console.log(polynomial.factoredExpressionString());

module.exports = math;
