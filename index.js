const math = {
    compute: require('./src/Compute/ComputeFunction'),
    ComplexNumber: require('./ComplexNumberClass'),
    Expression: require('./src/Classes/ExpressionClass'),
    Polynomial: require('./src/SolvingEquations/PolynomialClass'),
    RationalFunction: require('./src/SolvingEquations/RationalFunctionClass'),
    FunctionNameInformationMap: require('./src/FunctionNameInformationMap')
};

const polynomial1 = new math.Polynomial([1, "pi"]);
const polynomial2 = new math.Polynomial([1, "e"]);
const polynomial3 = new math.Polynomial([1, "i"]);

console.log(`(${polynomial1.toString()})(${polynomial2.toString()})(${polynomial3.toString()}) = ${math.Polynomial.multiply([polynomial1, polynomial2, polynomial3]).factoredExpressionString()}`);

module.exports = math;
