const math = {
    compute: require('./src/Compute/ComputeFunction'),
    ComplexNumber: require('./ComplexNumberClass'),
    Expression: require('./src/Classes/ExpressionClass'),
    Polynomial: require('./src/SolvingEquations/PolynomialClass'),
    RationalFunction: require('./src/SolvingEquations/RationalFunctionClass'),
    FunctionNameInformationMap: require('./src/FunctionNameInformationMap')
};

const polynomial1 = new math.Polynomial([1,4,6,4,1]);
const polynomial2 = new math.Polynomial([1,2]);
// console.log(`(${polynomial1.toString()})/(${polynomial2.toString()}) = ${math.Polynomial.divide([polynomial1, polynomial2]).toString()}`)
console.log(polynomial1.factoredExpressionString());

module.exports = math;
